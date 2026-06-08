const { MongoClient } = require("mongodb");

const uri =process.env.MONGODB_URI;

async function run() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log("CONNECTED SUCCESSFULLY");
    await client.close();
  } catch (err) {
    console.log("FAILED:", err);
  }
}

run();