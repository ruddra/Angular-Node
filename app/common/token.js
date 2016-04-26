var tokenGenerator = require('jsonwebtoken');
var config = require('../../config');
var secretKey = config.secretKey;
var expiryTime = config.expirySeconds;

module.exports.createToken = function(user) {
	var token = tokenGenerator.sign({
		name: user.name,
		username: user.username,
		id: user._id
	}, secretKey, {
		expiresIn: expiryTime,
	});

	return token
}

module.exports.verifyToken = function(token, callback) {
	tokenGenerator.verify(token, secretKey, function(err, decoded) {
		if (err) {
			callback(false);
		} else {
			callback(decoded);
		};
	});
};