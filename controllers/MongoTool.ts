const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://test:aZeRtY123@cluster0.ngib3.mongodb.net/database";

var add = async() => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    await client.connect();
    const db = client.db('database');
    const collection = db.collection('test');
    const result = await collection.insertOne({
        "name": "insert from node",
        "truc": {
            "array": [
                "a",
                "b",
                "c"
            ]
        }
    });

    console.log("Added ID: " + result.insertedId);
    client.close()
};

var get = async() => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    await client.connect();
    const db = client.db('database');
    const collection = db.collection('test');
    let cursor = await collection.find({});
    let result = await cursor.toArray();
    client.close()
    return result;

};

module.exports = {
    add: add,
    get: get
}
