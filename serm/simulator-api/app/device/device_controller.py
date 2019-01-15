from bson.json_util import dumps

from app import app
from app import db


@app.route('/devices', methods=['GET'])
def get_all_devices():
    collection = db['devices']
    devices = collection.find()
    response = []
    for device in devices:
        response.append(device)
    return dumps(response)


@app.route('/devices/<uuid:id>', methods=['GET'])
def get_device(id):
    collection = db['devices']
    return dumps(collection.find_one({"id": id}))
