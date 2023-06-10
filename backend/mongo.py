import pymongo


class MongoWrapper:
    def __init__(self, db_name, db_uri="mongodb://localhost:27017"):
        self.db_name = db_name
        self.db_uri = db_uri

        mongo = pymongo.MongoClient(self.db_uri)
        mongo.server_info()

        db = mongo[self.db_name]
        self.db = db

    def get(
        self,
        collection,
        db_query=None,
        projection=None,
        limit=None,
        distinct=None,
        sort_keys=None,
    ):

        db_response = self.db[collection].find(db_query or {}, projection)
        if sort_keys:
            db_response = db_response.sort(sort_keys)
        if limit:
            db_response = db_response.limit(limit)
        if distinct:
            db_response = db_response.distinct(distinct)

        return list(db_response)

    def add(self, collection, record):

        inserted_id = self.db[collection].insert_one(record).inserted_id

        return inserted_id

    def alter(
        self,
        collection,
        db_query=None,
        set_values=None,
        unset_values=None,
        upsert=False,
    ):

        values = {}
        if set_values:
            values["$set"] = set_values
        if unset_values:
            values["$unset"] = unset_values

        db_response = self.db[collection].update_one(
            db_query or {}, values, upsert=upsert
        )
        return db_response.upserted_id

    def delete(self, collection, db_query):

        self.db[collection].delete_many(db_query)
