//const movieInfo = require("../../src/routers/topMoviesRouter")





function approvedMovie() {
    var choices = [];
    var yes = document.getElementById("yes");
    var no = document.getElementById("no");
    yes.addEventListener("click", () => {
        console.log(movieInfo.topMovies)
        console.log("working!")
        choices.push(randomMovie.topMovies);
        console.log(choices);
    });

};

module.exports = {approvedMovie}