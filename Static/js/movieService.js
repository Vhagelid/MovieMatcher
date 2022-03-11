var movies = require('../data/topMovies.json');

const chooseRandom = (topMovies, num = 1) => {
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
 console.log(chooseRandom(topMovies, 4));