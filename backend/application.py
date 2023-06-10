from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from mongo import MongoWrapper
from utils import responsify


load_dotenv()

application = Flask(__name__)
CORS(application)
db = MongoWrapper(os.environ.get("DB"), os.environ.get("DB_URI"))


@application.route("/trial", methods=["GET", "POST"])
def trial():
    return responsify({"msg": "Trial msg"}, 200)