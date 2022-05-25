const { greenBright } = require('chalk');
const express = require('express');
const debug = require('debug')('app:adminRouter');
const {MongoClient} = require('mongodb')
//const sessions = require('../data/sessions.json');


const adminRouter = express.Router();

adminRouter.route('/').get((req, res)=>{
    const dbName = 'MovieMatcherDB';
    
    (async function mongo(){
        let client;
        try {
          console.log(`dbConnectionStr=${dbConnString}`);

          client = await MongoClient.connect(dbConnString);
          debug('connecting to the DB...')

          const db = client.db(dbName);
          debug('connected to the DB')
          const response = await db.collection('sessions').insertMany(sessions);
        debug('Adding sessions..')

          //const sessions = await db.collection('sessions').find().toArray();
          //res.render('sessions', { sessions });
         res.json(response);
        } catch (error) {
            debug(error.stack);
        }
        debug('closing the DB')
        client.close();

    })();
});

module.exports = adminRouter;