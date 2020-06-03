var express = require('express');
var router = express.Router();
var db = require('../DBfunctions/sqlDB.js');




router.post('/getAllPosts', function(req, res, next) {

	db.getAllPosts(function (err, result) {
		
		if (err) {
			console.log(err);
			return res.json({ "status": "failed", "message": "DB Error!", "code": 500 });
		}
			
		return res.json({ "status": "success", "message": "Items Received!", "code": 200, "items": result });
	});
});


router.post('/getSinglePost', function(req, res, next) {

	var id = req.body.id;

	if(!id)
	return res.json({ "status": "failed", "message": "Invalid Data!", "code": 500 });

	db.getSinglePost(id, function (err, result) {
		
		if (err) {
			console.log(err);
			return res.json({ "status": "failed", "message": "DB Error!", "code": 500 });
		}
			
		return res.json({ "status": "success", "message": "Items Received!", "code": 200, "items": result });
	});
});



module.exports = router;
