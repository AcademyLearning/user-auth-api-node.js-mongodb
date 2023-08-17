const { MongoClient } = require("mongodb");

const uri = "mongodb://0.0.0.0:27017";
const dbName = "user";
const client = new MongoClient(uri);

async function connectToDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db(dbName);
  } catch (err) {
    console.error("Error connecting to MongoDB", err);
  }
}

function getUserCollection() {
  const db = client.db(dbName);
  return db.collection("users");
}

module.exports = { connectToDB, getUserCollection };
