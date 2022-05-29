const express = require("express");
// const debug = require('debug')('app:topMoviesRouter');
const topMoviesRouter = express.Router();
//const topMovies = require('../data/topMovies.json');
const moviesService = require("../services/moviesServices");
// const { MongoClient, ObjectID } = require('mongodb');
// const moviePick = require("../../Static/js/moviePick")

// const dbName = 'MovieMatcherDB';
// const collection = 'approvedMovie';

topMoviesRouter.use(async(req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/")
  }
});

topMoviesRouter.route("/").get(async(req, res) => {
  // moviePick.approvedMovie(topMovies);
  let sessionId = req.query.sessionId;
  console.log({ sessionId });
  let movie = moviesService.GetRandomMovie(sessionId, 0);
  console.log(req.user.username);
  res.render("movies", { movie, });
});

topMoviesRouter.route("/").post(async (req, res) => {

  console.log(req.body);
  let reqBody = req.body;
  // let movieId=req.body.movieId;
  // let index=req.body.index;
  // let yesno=req.body.yesno;
  // let sessionId=req.body.sessionId;

  let sessionId = req.sessionID;
  let des = { sessionId: sessionId, movieId: reqBody.movieId, movieTitle: reqBody.movieTitle, yesNo: reqBody.yesno, userId: req.user.username };
  console.log(des);
  try {
    let result = await moviesService.saveApprovedMovie(des);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
  let movie = moviesService.GetRandomMovie(reqBody.sessionId, reqBody.index);

  /* on end
   if movie == null
   your done,
   redirect to stat page
   */
  let userId = req.user.username;
  // res.render("movies", { movie, });
  if (movie != null) {
    res.render("movies", { movie, });
  } else {

    let decisions = null;
    decisions = await moviesService.getMovieDecisions(userId, sessionId);
    // (async function () { 
    //   decisions = await moviesService.getMovieDecisions(userId, sessionId); 
    //   console.log(decisions);
    // }
    // );
    console.log(decisions);
    res.render("done", { decisions });
  }


});








module.exports = topMoviesRouter;