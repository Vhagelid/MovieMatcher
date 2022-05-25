// const movieInfo = require("../../src/routers/topMoviesRouter");
//const page = require("../../src/views/movies.ejs");




function approvedMovie(button) {
    var choices = [];
    var yesnoinp = document.getElementById("yesno");
    yesnoinp.value=button.id;
    submit();



};


// module.exports = {approvedMovie}