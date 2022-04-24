
let topMovies=require("../data/topMovies.json");
let sessionsSelection=require("../data/sessionMovies.json");

function GetTopMovies() {
    return topMovies;
}

function GetTop10Movies() {
    return topMovies.slice(0, 2);
}

function GetRandomMovie() {
    return chooseRandom(sessionsSelection);
}


var chooseRandom = (movies, num = 0) => {
    let curM=movies[num];
    console.log(curM);
    return curM;

 };

module.exports={GetTopMovies, GetTop10Movies, GetRandomMovie};