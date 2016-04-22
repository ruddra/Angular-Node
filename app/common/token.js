var tokenGenerator = require('jsonwebtoken');
var config = require('../../config');
var secretKey = config.secretKey;
var _expiresInMinute = config.expiresInMinute;

module.exports.createToken = function(user){
	var token = tokenGenerator.sign({
		name: user.name,
		username: user.username,
		_id: user._id
	}, secretKey, {
		expiresInMinute: _expiresInMinute
	});

	return token
}

module.exports.verifyToken = function (token) {
	 tokenGenerator.verify(token, secretKey, function (err, decoded) {
	 	 if(err){
	 	 	return false;
	 	 } else{
	 	 	return decoded;
	 	 };
	 });
};