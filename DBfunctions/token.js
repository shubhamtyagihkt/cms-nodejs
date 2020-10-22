var config = require('../config');

var jwt = require("jsonwebtoken");
var funcs = {};


funcs.createToken = function (userid) {
	var token = jwt.sign(
		{"userid": userid}, 
		config.jwtsecret,
		{
			issuer: config.jwtissuer,
			expiresIn: config.jwtexpiry // seconds
		}
	); // you can set many other things too for security

	return token;
}


funcs.getUseridFromToken = function (token, callback) {
	jwt.verify(token, config.jwtsecret, {issuer: config.jwtissuer}, function(err, decoded) {      
		if (err)
			return callback(err, 0);
		return callback(err, decoded.userid);
	});
}


module.exports = funcs;