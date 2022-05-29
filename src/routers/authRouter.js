const express = require("express");
const debug = require('debug')('app:sessionRouter');
const {MongoClient, ObjectID} = require('mongodb');
const passport = require('passport');

const usersRepository = require('../repositories/usersRepository');
const authRouter = express.Router();


authRouter.route('/signUp').get((req, res)=>{
    res.render('signup');
});



authRouter.route('/signUp').post((req, res)=>{
    

    const {name, username, password} = req.body;
    debug(`Results: ${name}`);
    (async function addUser (){
        try {
            let results=await usersRepository.createUserIfNotExists(username, password);
            debug(`Results: ${results}`);
            res.redirect('/');
            // req.login(results, ()=>{
                
            // });
        } catch (error) {
            debug(error)
        }
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