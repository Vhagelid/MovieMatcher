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



module.exports = aboutRouter;