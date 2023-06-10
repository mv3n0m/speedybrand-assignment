import os
from flask import Flask, request
from flask_cors import CORS
from dotenv import load_dotenv
from mongo import MongoWrapper
from utils import responsify
from bson.objectid import ObjectId


load_dotenv()

application = Flask(__name__)
CORS(application)
db = MongoWrapper(os.environ.get("DB"), os.environ.get("DB_URI"))


@application.route("/add-topic", methods=["POST"])
def add_topic():
    request_json = request.json

    db.add("topics", { **request_json, "category": "Custom" })
    return responsify({"success": "Topic added successfully."}, 200)


@application.route("/fetch-topics", methods=["POST"])
def fetch_topics():
    request_json = request.json

    results = db.get("topics", request_json)
    for result in results:
        result["_id"] = str(result["_id"])

    return responsify(results, 200)


@application.route("/delete-topic", methods=["POST"])
def delete_topic():
    request_json = request.json

    if "_id" not in request_json:
        return responsify({error: "_id is a required field"}, 400)

    _id = ObjectId(request_json["_id"])

    db.delete("topics", { "_id": _id })
    return responsify({"success": "Topic deleted successfully."}, 200)


if __name__ == "__main__":
    application.run(host="0.0.0.0", port=8008, debug=True)
