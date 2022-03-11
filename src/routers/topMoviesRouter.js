const express = require("express");
const debug = require('debug')('app:topMoviesRouter');
const topMoviesRouter = express.Router();
//const topMovies = require('../data/topMovies.json');
const moviesService=require("../services/moviesServices")


topMoviesRouter.route("/").get((req, res) => {
    let topMovies=moviesService.GetTop10Movies();


    res.render("movies", {topMovies,});
});






module.exports = topMoviesRouter;