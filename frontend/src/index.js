import * as React from 'react';
import * as ReactDOM from 'react-dom';

//import 
require('bootstrap/dist/css/bootstrap.css');
require("bootstrap")
//require("font-awesome-webpack")
require('font-awesome/css/font-awesome.css');
//import './../node_modules/bootstrap/dist/js/bootstrap.js';
//import './../scss/main.scss'

//import 'bootstrap/dist/css/bootstrap.css';

import PokeApp from "./jsx/PokeApp.js";

fetch("/pokedex-api/pokemon").then((res) => res.json()).then((res) => {
	console.log(res);
});



ReactDOM.render(
  <PokeApp />,
  document.getElementById('root')
);