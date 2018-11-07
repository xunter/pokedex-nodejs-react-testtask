var express = require('express');
var app = express();

var http = require('http');
var pokeapi = require("./pokedex_http_api.js");

var options = {
  index: "index.html"
};

app.use(express.static('./../frontend/dist/', options));

app.get('/pokedex-api/:method', function(req, res){
	
	let apiMethod = req.params["method"];
	pokeapi.getApi(apiMethod).then((obj) => res.json(obj)).catch(() => res.status(500));
	
});

app.get('/pokedex-api/:method/:id', function(req, res){
	
	let apiMethod = req.params["method"];
	let apiId = req.params["id"];
	pokeapi.getApi(apiMethod + "/" + apiId).then((obj) => res.json(obj)).catch(() => res.status(500));
	
});

app.get('/pokedex-api', function(req, res){
	
	let apiMethod = req.query.apiurl;
	pokeapi.getApi(apiMethod).then((obj) => res.json(obj)).catch(() => res.status(500));
	
});

app.listen(3000);

