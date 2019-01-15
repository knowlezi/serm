import json


class Device:
    def __init__(self, raw_result):
        self.ip = None
        self.location = None
        self.os = None
        self.port = None
        self.type = None
        self.product = None
        self.raw_result = raw_result
        self.process()

    def process(self):
        if 'ip_str' in self.raw_result and self.raw_result['ip_str']:
            self.ip = self.raw_result['ip_str']
        if 'location' in self.raw_result and self.raw_result['location']:
            self.location = self.raw_result['location']
        if 'os' in self.raw_result and self.raw_result['os']:
            self.os = self.raw_result['os']
        if 'devicetype' in self.raw_result and self.raw_result['devicetype']:
            self.type = self.raw_result['devicetype']
        if 'product' in self.raw_result and self.raw_result['product']:
            self.product = self.raw_result['product']
        if 'port' in self.raw_result and self.raw_result['port']:
            self.port = self.raw_result['port']

        return self

    # Checks whether the device data reaches satisfiable standard to simulate on
    def is_satisfiable(self):
        if self.os:
            if self.location:
                if self.location['longitude'] and self.location['latitude']:
                    return True

        return False

    def to_json(self):
        return json.loads(self.to_json_str())

    def to_json_str(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)