const express = require("express");
const debug = require('debug')('app:topMoviesRouter');
const topMoviesRouter = express.Router();
//const topMovies = require('../data/topMovies.json');
const moviesService=require("../services/moviesServices")
const {MongoClient, ObjectID} = require('mongodb')


topMoviesRouter.route("/").get((req, res) => {
    let topMovies=moviesService.GetTop10Movies();


    res.render("movies", {topMovies,});
});

// topMoviesRouter.use((req, res, next)=> {
//     if (req.user){
//       next();
//     } else {
//       res.redirect("/auth/signIn")
//     }
//   })





module.exports = topMoviesRouter;