var express = require('express');
var router = express.Router();
var db = require('../DBfunctions/sqlDB.js');


router.post('/updatePost', function(req, res, next) {

	//console.log(req);
	var id = req.body.id;
	var title = req.body.title;
	var description = req.body.editor1;
	var image_url =req.body.image_url;
	var category = req.body.category;

	if(!id || !title || !description || !image_url || !category)
	return res.json({ "status": "failed", "message": "Invalid Data!", "code": 500 });
	
	

	db.updatePost(id,title,description,image_url,category, function (err, result) {
		if (err) {
			console.log(err);
			return res.json({ "status": "failed", "message": "DB Error!", "code": 500 });
		}
	     res.redirect("/admin/edit?post_id="+id+"&status=success");
		//return res.json({ "status": "success", "message": "Items Received!", "code": 200, "items": result });
	});
});

router.post('/deletePost', function(req, res, next) {

	var id = req.body.id;
	
	if(!id)
	return res.json({ "status": "failed", "message": "Invalid Data!", "code": 500 });
	
	
	db.deletePost(id, function (err, result) {
		if (err) {
			console.log(err);
			return res.json({ "status": "failed", "message": "DB Error!", "code": 500 });
		}
			
		return res.json({ "status": "success", "message": "Items Received!", "code": 200, "items": result });
		//res.redirect("/admin/posts");
	});
});

router.post('/createPost', function(req, res, next) {

	var title = req.body.title;
	var description = req.body.description;
	var image_url =req.body.image_url;
	var category = req.body.category;
	var userid = 1;
    //change user id
	if(!userid || !title || !description || !image_url || !category)
	return res.json({ "status": "failed", "message": "Invalid Data!", "code": 500 });
	
	

	db.createPost(title,description,image_url,category,userid, function (err, result) {
		if (err) {
			console.log(err);
			return res.json({ "status": "failed", "message": "DB Error!", "code": 500 });
		}
		
		res.redirect("/admin/posts");	
		//return res.json({ "status": "success", "message": "Items Received!", "code": 200, "items": result });
	});
});


module.exports = router;
