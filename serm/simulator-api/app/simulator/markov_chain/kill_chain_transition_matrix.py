class TransitionMatrix(object):
    def __init__(self, device, malware):
        self.device = device
        self.malware = malware

    def determine_reconnaissance_success_probability(self):
        malware_spec = self.malware["specification"]

        for item in malware_spec:
            if item is "keywords":
                for keyword in malware_spec.get(item):
                    if type(keyword) is list:
                        option_found = False

                        for option in keyword:
                            if option.lower() in str(self.device["raw_result"]).lower():
                                option_found = True

                        if not option_found:
                            return 0
                    else:
                        if keyword.lower() not in self.device["raw_result"].lower():
                            return 0
            elif type(malware_spec.get(item)) is list:
                option_found = 0

                for option in malware_spec.get(item):
                    if option == self.device[item]:
                        option_found = True

                if not option_found:
                    return 0
            else:
                if item is "os":
                    if malware_spec.get(item) not in self.device[item]:
                        return 0
                elif malware_spec.get(item) != self.device[item]:
                    return 0

        return 1

    def determine_intrusion_success_probability(self):
        malware_exploits = self.malware["attack_vectors"]

        best_success_probability = 0

        for exploit in malware_exploits:
            success_probability = 0
            requirements_met = self.check_if_requirements_met(exploit)

            if requirements_met:
                # p(I|IS) = (requirements met buffer + probability of attack vector being successful)
                success_probability += (0.15 + exploit["probability_of_success"])

            if success_probability > best_success_probability:
                best_success_probability = success_probability

        return best_success_probability

    def check_if_requirements_met(self, exploit):
        for requirement in exploit["requirements"]:
            if type(exploit["requirements"][requirement]) is list:
                option_found = False

                for option in exploit["requirements"][requirement]:
                    if option == self.device[requirement]:
                        option_found = True

                if not option_found:
                    return False
            else:
                if requirement is "os":
                    if exploit["requirements"][requirement] not in self.device[requirement]:
                        return False
                elif exploit["requirements"][requirement] != self.device[requirement]:
                    return False
        return True

    def get_reconnaissance_transitions(self):
        r_to_rs_prob = self.determine_reconnaissance_success_probability()
        r_to_rf_prob = 1 - r_to_rs_prob

        return {
            'RECONNAISSANCE_SUCCESS': r_to_rs_prob,
            'RECONNAISSANCE_FAILURE': r_to_rf_prob
        }

    def get_intrusion_transitions(self):
        i_to_is_prob = self.determine_intrusion_success_probability()
        i_to_if_prob = 1 - i_to_is_prob

        return {
            'INTRUSION_SUCCESS': i_to_is_prob,
            'INTRUSION_FAILURE': i_to_if_prob
        }

    def get(self):
        return {
            'RECONNAISSANCE': self.get_reconnaissance_transitions(),
            'RECONNAISSANCE_SUCCESS': {
                'INTRUSION': 1
            },
            'RECONNAISSANCE_FAILURE': {
                'RECONNAISSANCE_FAILURE': 1
            },
            'INTRUSION': self.get_intrusion_transitions(),
            'INTRUSION_SUCCESS': {
                'EXPLOITATION': 1
            },
            'INTRUSION_FAILURE': {
                'INTRUSION_FAILURE': 1
            },
            'EXPLOITATION': {
                'EXPLOITATION_SUCCESS': 1
            },
            'EXPLOITATION_SUCCESS': {
                'ACTION': 1,
            },
            'EXPLOITATION_FAILURE': {
                'EXPLOITATION_FAILURE': 1,
            },
            'ACTION': {
                'ACTION_SUCCESS': 1
            },
            'ACTION_SUCCESS': {
                'ACTION_SUCCESS': 1,
            },
            'ACTION_FAILURE': {
                'ACTION_FAILURE': 1,
            }
        }