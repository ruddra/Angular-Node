var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var config = require('./config');

var app = express();

app.listen(config.port, function(err){
if(err){
	console.log('Error occured');
	console.log(err);
}else{
	console.log('Working on');
}
})