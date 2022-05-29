const MongoClient = require('../repositories/db');
const collection='approvedMovie';

let sessionsSelection=require("../data/sessionMovies.json");

function GetRandomMovie(sessionId, index) {
    return chooseRandom(sessionsSelection, index++);
}

async function saveApprovedMovie(descision) {
    try {
        let db = await MongoClient.getDb();
        await db.collection(collection).insertOne(descision)
            
    } catch (error) {
        
    }
    finally{
        MongoClient.close();
    }
}

async function getMovieDecisions(userId, sessionId){
    // {userId:'asd', sessionId:"wzBDzkdByre28MX3Qo2mfnMJG8lVIoZO"}
    try {
        let db = await MongoClient.getDb();
        let decisions=await db.collection(collection).find({userId, sessionId}).toArray();
        // console.log(decisions);
        return decisions;
            
    } catch (error) {
        
    }
    finally{
        MongoClient.close();
    }
}


var chooseRandom = (movies, num = 0) => {
    console.log(`Movies length:${movies.length} curNum:${num}`);

    let curM=movies[num];
    console.log(`${curM}`);
    return curM;

 };

module.exports={GetRandomMovie, saveApprovedMovie, getMovieDecisions};