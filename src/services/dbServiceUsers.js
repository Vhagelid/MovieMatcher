const { MongoClient } = require("mongodb")

const url = process.env.MONGODB_CONNSTRING
const dbName = 'MovieMatcherDB';
const collection='users';

function GetUser(username){
    client = await MongoClient.connect(url);
    debug('connecting to the DB...')
    const db = client.db(dbName);

    const user = await db.collection(collection).findOne({username});
    return user;
    
}

module.exports={GetUser};


