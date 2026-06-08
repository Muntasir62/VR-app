const { MongoClient } = require("mongodb");

const uri ="mongodb://muntasiralamayon_db_user:icl5ms4hoNBwTmSp@ac-uglibjf-shard-00-00.6kj5fe9.mongodb.net:27017,ac-uglibjf-shard-00-01.6kj5fe9.mongodb.net:27017,ac-uglibjf-shard-00-02.6kj5fe9.mongodb.net:27017/techdojo_vr_db?ssl=true&replicaSet=atlas-b8h5fh-shard-0&authSource=admin&appName=Cluster1";

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