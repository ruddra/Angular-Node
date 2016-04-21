var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BlogSchema = new Schema({
	title = {type:String, index: {unique: true}},
	body = String,
	publishing_time = [Date],
});

module.exports = mongoose.model('Blog', BlogSchema);