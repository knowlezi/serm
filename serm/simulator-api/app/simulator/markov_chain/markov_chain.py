import random


class MarkovChain(object):
    def __init__(self, origin, transition_matrix):
        self.visited_states = [origin]
        self.current_state = origin
        self.transition_matrix = transition_matrix

        # Seeding helps to reproduce results
        random.seed(42)

    def run(self):
        running = True

        while running:
            if self.at_absorbing_state():
                running = False
            else:
                self.move()

    def move(self):
        legal_transitions = self.transition_matrix[self.current_state]
        r = random.uniform(0, 1)

        next_state = None

        cumulative_probability = 0.0
        for transition in legal_transitions:
            transition_probability = legal_transitions[transition]
            cumulative_probability += transition_probability
            if r < cumulative_probability:
                next_state = transition
                break

        self.current_state = next_state
        self.visited_states.append(self.current_state)

    def at_absorbing_state(self):
        available_transitions = self.transition_matrix[self.current_state]
        if self.current_state in available_transitions:
            if available_transitions[self.current_state] == 1:
                return True
