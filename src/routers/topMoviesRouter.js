const express = require("express");
const debug = require('debug')('app:topMoviesRouter');
const topMoviesRouter = express.Router();
//const topMovies = require('../data/topMovies.json');
const moviesService=require("../services/moviesServices")
const {MongoClient, ObjectID} = require('mongodb')
const moviePick=require("../../Static/js/moviePick")

topMoviesRouter.route("/").get((req, res) => {
    let topMovies=moviesService.GetRandomMovie();
    moviePick.approvedMovie(topMovies);

    res.render("movies", {topMovies,});
});



topMoviesRouter.use((req, res, next)=> {
    if (req.user){
      next();
    } else {
      res.redirect("/auth/signIn")
    }
  })



  var topMovies=moviesService.GetRandomMovie();

module.exports = topMoviesRouter, topMovies;