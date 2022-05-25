const express = require("express");
const debug = require('debug')('app:sessionRouter');
const {MongoClient, ObjectID} = require('mongodb');
const passport = require('passport');

const dbConnString=process.env.MONGODB_CONNSTRING;

const authRouter = express.Router();

authRouter.route('/signUp').post((req, res)=>{
    const {username, password} = req.body;
    console.log(`dbConnectionStr=${dbConnString}`);
    const dbName = 'MovieMatcherDB';

    (async function addUser (){
        let client;
        try {
            client = await MongoClient.connect(dbConnString);

            const db = client.db(dbName);
            const user = {username, password};
            const results = await db.collection('users').insertOne(user);
            debug(`Results: ${results}`);
            req.login(results, ()=>{
                res.redirect('/auth/signin');
            });

        } catch (error) {
            debug(error)
        }
        client.close();
    }());


  
});

authRouter
    .route('/signIn')
    .get((req, res)=>{
    res.render('signin');
})

.post(
    passport.authenticate('local', {
    successRedirect: '/movies',
    failureMessage: '/movies',
})
);

authRouter.route('/profile').get((req, res)=>{
    res.json(req.user);
});






module.exports = authRouter;