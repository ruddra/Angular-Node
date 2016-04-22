var token = require('../common/token');

module.exports = function(api){
	api.use(function (req, resp, next) {

		 var ptoken = req.body.token || req.params.token || req.headers['x-access-token'];
		 if(ptoken){
		 	var verifiedToken = token.verifyToken(ptoken);
		 	if (!verifiedToken){
		 		resp.status(403).send({message: "Invalid token", success: false});
		 	}else{
		 		req.decoded = verifiedToken;
		 		next();
		 	};

		 }else{
		 	resp.status(403).send({message: "No token provided token", success: false});
		 };
	});

};