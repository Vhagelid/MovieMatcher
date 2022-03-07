var axios = require("axios").default;

var options = {
  method: 'GET',
  url: 'https://mdblist.p.rapidapi.com/',
  params: {s: 'jaws'},
  headers: {
    'x-rapidapi-host': 'mdblist.p.rapidapi.com',
    'x-rapidapi-key': '3f194083b9mshb6592ca85ccc39fp17e1a1jsn3a7b6947937d'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});