const express = require("express");
const debug = require("debug")("app:supportRouter");
const supportRouter = express.Router();
const {MongoClient, OjectID} = require("mongodb")

supportRouter.route("/").get((req, res) => {

    res.render("support")
})


module.exports = supportRouter;