from flask import request
from bson.json_util import dumps, loads

from app import app
from app.malware import malware_kb
from app.simulator.simulator import Simulator


@app.route('/sim', methods=['POST'])
def run_simulation():
    body = loads(request.data)
    sim = Simulator(malware_kb.get(body['malware']), body['devices'], body['params'])
    sim.run()
    return dumps(sim.simulation)
