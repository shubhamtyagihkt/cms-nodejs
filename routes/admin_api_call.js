var express = require('express');
var router = express.Router();
var db = require('../DBfunctions/sqlDB.js');


router.post('/updatePost', function(req, res, next) {

	var id = req.body.id;
	var title = req.body.title;
	var description = req.body.description;
	var image_url =req.body.image_url;
	var category = req.body.category;

	// console.log(title);
	// console.log(description);
	// console.log(image_url);
	// console.log(id);
	// console.log(category);
	// console.log(req.body);

	if(!id || !title || !description || !image_url || !category)
	return res.json({ "status": "failed", "message": "Invalid Data!", "code": 500 });
	
	

	db.updatePost(id,title,description,image_url,category, function (err, result) {
		if (err) {
			console.log(err);
			return res.json({ "status": "failed", "message": "DB Error!", "code": 500 });
		}
			
		return res.json({ "status": "success", "message": "Items Received!", "code": 200, "items": result });
	});
});

router.post('/deletePost', function(req, res, next) {

	var id = req.body.id;

	// console.log(id);
	
	if(!id)
	return res.json({ "status": "failed", "message": "Invalid Data!", "code": 500 });
	
	
	db.deletePost(id, function (err, result) {
		if (err) {
			console.log(err);
			return res.json({ "status": "failed", "message": "DB Error!", "code": 500 });
		}
			
		return res.json({ "status": "success", "message": "Items Received!", "code": 200, "items": result });
	});
});

router.post('/createPost', function(req, res, next) {

	var title = req.body.title;
	var description = req.body.description;
	var image_url =req.body.image_url;
	var category = req.body.category;
	var userid = req.body.userid;
	// console.log(title);
	// console.log(description);
	// console.log(image_url);
	// console.log(id);
	// console.log(category);
	// console.log(req.body);

	if(!userid || !title || !description || !image_url || !category)
	return res.json({ "status": "failed", "message": "Invalid Data!", "code": 500 });
	
	

	db.createPost(title,description,image_url,category,userid, function (err, result) {
		if (err) {
			console.log(err);
			return res.json({ "status": "failed", "message": "DB Error!", "code": 500 });
		}
			
		return res.json({ "status": "success", "message": "Items Received!", "code": 200, "items": result });
	});
});


module.exports = router;
