
// Asenna ensin express npm install express --save

var express = require('express');
var app=express();

var bodyParser = require('body-parser');
var valoKontroller = require('./valoKontroller');

const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = process.env.PORT || 3002;


//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Staattiset filut
app.use(express.static('public'));

app.route('/valot')
    .get(valoKontroller.valot)

app.route('/ilma')
    .get(valoKontroller.ilma)

app.get('/', function(request, response){
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/html');
    response.end("<h1>Valo api</h1>"); 
});

app.listen(port, hostname, () => {
  console.log(`Servu rullaa osoitteessa http://${hostname}:${port}/`);
});
