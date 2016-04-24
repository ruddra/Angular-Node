var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var config = require('./config');
var mongoose = require('mongoose');

mongoose.connect(config.database, function (err) {
	if(err){
		console.log(err);
	}else{
		console.log('Connection to Database has been successful');
	}
});

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(__dirname+ '/public'));

var api = require('./app/routes/api')(app, express);
app.use('/api', api);

app.get('*', function (req, res) {
	 res.sendFile(__dirname + '/public/app/views/index.html')
});

app.listen(config.port, function(err){
if(err){
	console.log('Error occured');
	console.log(err);
}else{
	console.log('Listening to port '+ config.port);
}
});