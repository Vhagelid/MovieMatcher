// const MongoClient = require("mongodb")
// const {MongoClient} = require('mongodb');

const MongoClient = require('./db');
// const url = process.env.MONGODB_CONNSTRING
const dbName = 'MovieMatcherDB';
const usersCollection = 'users';

async function initDb() {
    let client = await MongoClient.initDbClient();
    // console.log('connecting to the DB...')
    const db = client.db(dbName);
    return db;

}

async function createNonExistingUser(username, password){
    var db = await initDb();
    try {
        let user = await getUser(username);
        if (user==null) {
            let result = await createUser(username, password);
            if (result.acknowledged){
                user = await getUser(username);
            }
        }
        return user;

    } catch (error) {

    }
    finally {
        MongoClient.close();
    }

}


async function createUser(username, password) {
    var db = await initDb();
    try {
        let user = { username, password };
        let result = await db.collection(usersCollection).insertOne(user);
        return result;
    } catch (error) {

    }
    finally {
        MongoClient.close();
    }

}

async function getUser(usrName) {
    var db = await initDb();
    try {
        let user = await db.collection(usersCollection).findOne({username:usrName});
        // console.log(user);
        return user;

    } catch (error) {

    }
    finally {
        MongoClient.close();
    }
}

async function countUsers(usrName) {
    var db = await initDb();
    try {
        // let users = await db.collection(usersCollection).find({username:usrName});

        console.log("-------------");

        let count = await db.collection(usersCollection).estimatedDocumentCount({username:usrName});
        console.log('Count:' + count);
        return count;

    } catch (error) {

    }
    finally {
        MongoClient.close();
    }

}





module.exports = { getUser, createUser, countUsers, createNonExistingUser };


