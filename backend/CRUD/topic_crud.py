from database.mongDB import topics_collection

def get_all_topics():
    topics = list(topics_collection.find({}, {"_id": 0}))
    return topics