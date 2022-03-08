const express = require("express");
const debug = require('debug')('app:topMoviesRouter');
const topMoviesRouter = express.Router();
const topMovies = require('../data/topMovies.json');

topMoviesRouter.route("/").get((req, res) => {
    res.render("movies", {
        topMovies,
    });
});






module.exports = topMoviesRouter;