import shodan
import time
from pymongo import MongoClient

from collector.device.device import Device
from collector.config import config


class Collector:
    def __init__(self, api, db):
        self.api = api
        self.db = db

    def collect(self, number_of_pages, search_query, collection_name):
        devices_stored = 0

        for page_num in range(1, number_of_pages + 1):
            try:
                results = self.api.search(search_query, page=page_num)
            except shodan.APIError as e:
                print('Error when performing search: %s' % e)
                continue

            for result in results['matches']:
                device = Device(result)
                if device.is_satisfiable():
                    try:
                        if not self.exists(collection_name, device):
                            self.db[collection_name].insert(device.__dict__, check_keys=False)
                            devices_stored += 1
                    except:
                        print('Exception: MongoDB Error\n')

            print('Page ' + str(page_num) + ' of ' + str(number_of_pages) +
                  ' processed successfully')
            print(str(devices_stored) + ' devices collected\n')

            time.sleep(1)

        print(str(devices_stored) + ' total devices collected')

    def exists(self, collection_name, device):
        return self.db[collection_name].find_one({'ip': device.ip, 'location': device.location})


def setup(api_key, search_query, number_of_pages, host='localhost', port=27017, db_name='steorm',
          collection_name='devices'):
    api = shodan.Shodan(api_key)
    client = MongoClient(host, port)
    db = client[db_name]
    collector = Collector(api, db)
    collector.collect(number_of_pages, search_query, collection_name)


if __name__ == '__main__':
    setup(api_key=config.API_KEY, search_query='port:"23" os:"Linux"', number_of_pages=50)
