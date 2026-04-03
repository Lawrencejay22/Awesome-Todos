require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/todosdb";


const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
};

let client;
const connectToMongoDB = async () => {
      if(!client) {

    client = await MongoClient.connect(uri, options);
    console.log("Connected to MongoDB");
  }
  return client;
};

const getConnectedClient = () => client;

module.exports = { connectToMongoDB, getConnectedClient };