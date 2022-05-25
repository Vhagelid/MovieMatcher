const express = require("express");
const debug = require('debug')('app:topMoviesRouter');
const topMoviesRouter = express.Router();
//const topMovies = require('../data/topMovies.json');
const moviesService=require("../services/moviesServices")
const {MongoClient, ObjectID} = require('mongodb')
const moviePick=require("../../Static/js/moviePick")

const dbName = 'MovieMatcherDB';
const collection='approvedMovie';

topMoviesRouter.use((req, res, next)=> {
  if (req.user){
    next();
  } else {
    res.redirect("/auth/signIn")
  }
})

topMoviesRouter.route("/").get((req, res) => {
    // moviePick.approvedMovie(topMovies);
    let sessionId=req.query.sessionId;
    console.log({sessionId});
    let movie=moviesService.GetRandomMovie(sessionId,0);
    console.log(req.user.username);
    res.render("movies", {movie,});
});

topMoviesRouter.route("/").post((req, res)=> {
  console.log(req.body);
  let reqBody=req.body;
  // let movieId=req.body.movieId;
  // let sessionId=req.body.sessionId;
  // let index=req.body.index;
  // let yesno=req.body.yesno;

  let des = {sessionId:reqBody.sessionId,movieId:reqBody.movieId, yesNo:reqBody.yesno, userId:req.user.username};
  console.log(des);



  (async function saveApprovedMovie(){
    let client;
    try {
      client = await MongoClient.connect(dbConnString);
      let db = client.db(dbName);
      let result = await db.collection(collection).insertOne(des)
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    client.close();
  }())
  let movie=moviesService.GetRandomMovie(reqBody.sessionId, reqBody.index);
  /* on end
   if movie == null
   your done,
   redirect to stat page
   */
  res.render("movies", {movie,});

});








module.exports = topMoviesRouter;