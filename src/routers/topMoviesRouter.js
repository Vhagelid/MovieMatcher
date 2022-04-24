const express = require("express");
const debug = require('debug')('app:topMoviesRouter');
const topMoviesRouter = express.Router();
//const topMovies = require('../data/topMovies.json');
const moviesService=require("../services/moviesServices")
const {MongoClient, ObjectID} = require('mongodb')
const moviePick=require("../../Static/js/moviePick")

topMoviesRouter.use((req, res, next)=> {
  if (req.user){
    next();
  } else {
    res.redirect("/auth/signIn")
  }
})

topMoviesRouter.route("/").get((req, res) => {
    // moviePick.approvedMovie(topMovies);
    let movieId=req.query.movieId;
    let yesno=req.query.yesno;
    
    console.log({movieId,yesno});

    let movie=moviesService.GetRandomMovie();


    console.log(req.user.username);
    res.render("movies", {movie,});
});








module.exports = topMoviesRouter;