var tokenGenerator = require('jsonwebtoken');
var config = require('../../config');
var secretKey = config.secretKey;
var expiresInMinute = config.expiresInMinute;

module.exports.createToken = function(user){
	var token = tokenGenerator.sign({
		name: user.name,
		username: user.username,
		_id: user._id
	}, secretKey, {
		expiresInMinute: expiresInMinute	
	});

	return token
}