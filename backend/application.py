import os
from flask import Flask, request
from flask_cors import CORS
from dotenv import load_dotenv
from mongo import MongoWrapper
from utils import responsify


load_dotenv()

application = Flask(__name__)
CORS(application)
db = MongoWrapper(os.environ.get("DB"), os.environ.get("DB_URI"))


@application.route("/add-topic", methods=["POST"])
def add_topic():
    request_json = request.json

    db.add("topics", { **request_json, "category": "Custom" })
    return responsify({"success": "Topic added successfully."}, 200)



if __name__ == "__main__":
    application.run(host="0.0.0.0", port=8008, debug=True)
