const express = require("express");
const req = require("express/lib/request");
const debug = require('debug')('app:sessionRouter');
const {MongoClient, ObjectID} = require('mongodb')
//const sessions = require("../data/sessions.json");
const sessionsRouter = express.Router();



sessionsRouter.route("/").get((req, res) => {
    const dbName = 'MovieMatcherDB';
    
    (async function mongo(){
        let client;
        try {
          client = await MongoClient.connect(dbConnString);
          debug('connecting to the DB...')

          const db = client.db(dbName);
          debug('connected to the DB')
          const sessions = await db.collection('sessions').find().toArray();
        debug('Adding sessions..')

          //const sessions = await db.collection('sessions').find().toArray();
          //res.render('sessions', { sessions });
         res.render("sessions", {sessions});
        } catch (error) {
            debug(error.stack);
        }
        debug('closing the DB')
        client.close();

    })();
    
});

sessionsRouter.route("/:id").get((req, res) => {
    const id = req.params.id;
    // const dbConnString = 'mongodb://localhost:27017';
    const dbName = 'MovieMatcherDB';
    
    (async function mongo(){
        let client;
        try {
          client = await MongoClient.connect(dbConnString);
          debug('connecting to the DB...')

          const db = client.db(dbName);
          debug('connected to the DB')
          const session = await db.collection('sessions').findOne({_id: new ObjectID (id)});
        debug('Adding sessions..')

          //const sessions = await db.collection('sessions').find().toArray();
          //res.render('sessions', { sessions });
          res.render("session", {
            session,
        });
        } catch (error) {
            debug(error.stack);
        }
        debug('closing the DB')
        client.close();

    })();
  
});

module.exports = sessionsRouter;