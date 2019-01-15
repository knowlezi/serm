from pymongo import MongoClient


def clear(collection_name, host='localhost', port=27017, db_name='serm'):
    client = MongoClient(host, port)
    db = client[db_name]
    db.drop_collection(collection_name)

clear('devices')
