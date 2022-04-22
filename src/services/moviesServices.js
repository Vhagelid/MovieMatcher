
  let topMovies=require("../data/topMovies.json");

function GetTopMovies() {
    return topMovies;
}

function GetTop10Movies() {
    return topMovies.slice(0, 2);
}

function GetRandomMovie() {
    return chooseRandom(topMovies);
}


var chooseRandom = (topMovies, num = 1) => {
    const res = [];
    for(let i = 0; i < num; ){
       const random = Math.floor(Math.random() * topMovies.length);
       if(res.indexOf(topMovies[random]) !== -1){
          continue;
       };
       res.push(topMovies[random]);
       i++;
    };
    return res;
 };

module.exports={GetTopMovies, GetTop10Movies, GetRandomMovie};