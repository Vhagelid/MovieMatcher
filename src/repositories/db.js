const { MongoClient } = require('mongodb');
const url = process.env.MONGODB_CONNSTRING
const dbName = 'MovieMatcherDB';
let client = null;

async function initDbClient() {
    try {
        // if (client != null) return client;
        client = await MongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        return client;
    } catch (error) {
        client.close();
    }
};

async function getDb() {
    client= await initDbClient();
    return await client.db(dbName);
};


function close() {

    if (client != null) client.close();
}

module.exports = { initDbClient, close, getDb };