const express = require("express");
const debug = require('debug')('app:aboutRouter');
const aboutRouter = express.Router();
const {MongoClient, ObjectID} = require('mongodb')


aboutRouter.route("/").get((req, res) => {





    res.render("about");
});

aboutRouter.route("/riskAsses").get((req, res) => {



    res.render("riskAssesement");
});

aboutRouter.route("/projects").get((req, res) => {
    res.render("projects");
});

aboutRouter.route("/projects/project1").get((req, res) => {


    res.render("project1");
});

aboutRouter.route("/projects/project2").get((req, res) => {


    res.render("project2");
});


module.exports = aboutRouter;