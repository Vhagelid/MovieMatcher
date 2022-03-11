let topMovies=require("../data/topMovies.json");

function GetTopMovies() {
    return topMovies;
}

function GetTop10Movies() {
    return topMovies.slice(0, 10);
}

module.exports={GetTopMovies, GetTop10Movies};