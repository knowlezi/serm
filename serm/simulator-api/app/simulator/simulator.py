import uuid
import simpy
import random

from app import db
from app.common import utilities
from app.malware import malware_kb
from app.simulator.markov_chain.kill_chain_transition_matrix import TransitionMatrix
from app.simulator.markov_chain.markov_chain import MarkovChain


class Simulator(object):
    def __init__(self, malware, devices, params):
        self.env = simpy.Environment()
        self.malware = malware
        self.devices = random.sample(devices, len(devices))
        self.params = params
        self.simulation = {
            "id": str(uuid.uuid4()),
            "request": {
                "malware": malware,
                "devices": devices,
                "params": params
            },
            "events": [],
            "statistics": {
                "total_devices": 0,
                "total_infected": 0,
                "total_clean": 0,
                "run_time": 0
            }
        }

    def run(self):
        # Seeding helps with reproducing results
        random.seed(42)
        
        self.env.process(self.simulate())
        self.env.run()

    def simulate(self):
        for dev in self.devices:
            if self.params["location"] != "Worldwide":
                if dev["location"]:
                    if dev["location"]["country_name"] == self.params["location"]:
                        yield self.env.process(self.release(dev))
            else:
                yield self.env.process(self.release(dev))

        self.simulation["statistics"]["run_time"] = self.get_runtime(self.simulation)

    def release(self, dev):
        self.simulation["statistics"]["total_devices"] += 1

        transition_matrix = TransitionMatrix(dev, self.malware)
        chain = MarkovChain("RECONNAISSANCE", transition_matrix.get())
        chain.run()

        for state in chain.visited_states:
            yield self.env.process(self.append_event(state, dev))

    def append_event(self, state, dev):
        yield self.env.timeout(self.get_timeout_for_state(state))

        event = {
            "RECONNAISSANCE": self.create_event(self.env.now, dev, "Performing reconnaissance on device", 0),
            "RECONNAISSANCE_SUCCESS": self.create_event(self.env.now, dev, "Device meets specification set by malware",
                                                        0),
            "RECONNAISSANCE_FAILURE": self.create_event(self.env.now, dev,
                                                        "Device does not meet specification set by malware", -1),
            "INTRUSION": self.create_event(self.env.now, dev, "Attempting to gain access to device", 0),
            "INTRUSION_SUCCESS": self.create_event(self.env.now, dev, "Access successfully gained to device", 0),
            "INTRUSION_FAILURE": self.create_event(self.env.now, dev, "Failed to gain access to device", -1),
            "EXPLOITATION": self.create_event(self.env.now, dev, "Attempting to infect device", 0),
            "EXPLOITATION_SUCCESS": self.create_event(self.env.now, dev, "Device successfully infected with " +
                                                   self.malware["name"], 1),
            "EXPLOITATION_FAILURE": self.create_event(self.env.now, dev, "Failed to infect device with " +
                                                   self.malware["name"], -1),
            "ACTION": self.create_event(self.env.now, dev, "Attempting to perform action on device", 1),
            "ACTION_SUCCESS": self.create_event(self.env.now, dev, self.malware["actions"], 1),
            "ACTION_FAILURE": self.create_event(self.env.now, dev, "Unable to perform action on device", 1),
        }[state]

        self.simulation['events'].append(event)

        if state is "EXPLOITATION_SUCCESS":
            self.simulation["statistics"]["total_infected"] += 1
        elif state in ["RECONNAISSANCE_FAILURE", "INTRUSION_FAILURE", "EXPLOITATION_FAILURE"]:
            self.simulation["statistics"]["total_clean"] += 1

    @staticmethod
    def create_event(secs, dev, msg, infection_status):
        return {
            "id": str(uuid.uuid4()),
            "time": {
                "ms": int(secs * 1000),
                "formatted_timestamp": utilities.convert_seconds_to_timestamp(secs)
            },
            "device": dev,
            "message": msg,
            "infection_status": infection_status
        }

    @staticmethod
    def get_timeout_for_state(state):
        return {
            "RECONNAISSANCE": 0,
            "RECONNAISSANCE_SUCCESS": random.uniform(0.1, 2),
            "RECONNAISSANCE_FAILURE": random.uniform(0.1, 2),
            "INTRUSION": 0,
            "INTRUSION_SUCCESS": random.uniform(2, 5),
            "INTRUSION_FAILURE": random.uniform(2, 5),
            "EXPLOITATION": 0,
            "EXPLOITATION_SUCCESS": random.uniform(5, 10),
            "EXPLOITATION_FAILURE": random.uniform(5, 10),
            "ACTION": 0,
            "ACTION_SUCCESS": random.uniform(5, 10),
            "ACTION_FAILURE": random.uniform(5, 10)
        }[state]

    @staticmethod
    def get_runtime(sim):
        last_event = sim["events"][len(sim["events"]) - 1]
        return last_event.get("time").get("formatted_timestamp")


def run_simulation(malware_name, devices):
    # Create and start simulator
    sim = Simulator(malware_kb.get(malware_name), devices, {"location": "Worldwide"})
    sim.run()

    for e in sim.simulation["events"]:
        print(e["time"]["formatted_timestamp"] + " // " + e["device"]["ip"] + ":" + str(e["device"]["port"]) + " // " + e["message"])

    print('\nStatistics:')
    for s in sim.simulation["statistics"]:
        print(s + " - " + str(sim.simulation["statistics"][s]))

if __name__ == "__main__":
    collection = db['devices']
    devices = collection.find()
    response = []
    for device in devices:
        response.append(device)

    run_simulation("BASHLITE", response)
