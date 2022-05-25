const express = require("express");
const debug = require("debug")("app:supportRouter");
const supportRouter = express.Router();
const {MongoClient, OjectID} = require("mongodb")
const path = require('path')
const dbName = 'MovieMatcherDB';
const collection='feedbacks';

supportRouter.route("/").get((req, res) => {


    res.render("support")
})

supportRouter.route('/post-feedback').post((req, res)=> {
    console.log("stuff happens");

    (async function postFeedBack(){
        let client;
        try {
            client = await MongoClient.connect(dbConnString);
            let db = client.db(dbName);
            let result=await db.collection(collection).insertOne(req.body);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
        client.close();

    }());




    //res.send('Data received:\n' + JSON.stringify(req.body));
    res.render("supportFeedback")
});

supportRouter.get('/view-feedbacks',  function(req, res) {
    dbConnString.then(function(db) {
        db.collection('feedbacks').find({}).toArray().then(function(feedbacks) {
            res.status(200).json(feedbacks);
        });
    });
});


module.exports = supportRouter;