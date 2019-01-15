from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)
client = MongoClient('localhost', 27017)
db = client['serm']

from app.index import index_controller
from app.device import device_controller
from app.malware import malware_controller
from app.simulator import simulator_controller
