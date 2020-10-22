var express = require('express');
var router = express.Router();
var db = require('../DBfunctions/sqlDB.js');
var jwt = require('../DBfunctions/token.js');

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
router.post('/register', function(req, res, next) {
	var name = req.body.name;
	var email = req.body.email;
	var password = req.body.password;

	if(name == "")
		return res.json({ "status": "failed", "message": "Please enter your name!"});
	if(email == "")
		return res.json({ "status": "failed", "message": "Please enter a valid email address!"});
	if(password == "")
		return res.json({ "status": "failed", "message": "Please enter password!"});

	db.findUserByEmail(email, function (err, rows) {
	    if (err) {
	    	console.log(err);
	    	return res.json({ "status": "failed", "message": "Error!" });
	    }

	    if(rows.length != 0)
    		return res.json({ "status": "failed", "message": "Email already registered!" });

    	db.insertNewUser(name, email, password, function (err, result) {
    		if (err) {
		    	console.log(err);
		    	return res.json({ "status": "failed", "message": "Error!" });
		    }
		    
			return res.json({ "status": "success", "message": "Registration Successful!" });
    	});
	});
});
router.post('/login', function(req, res, next) {
	var email = req.body.email;
	var password = req.body.password;

	if(email == "")
		return res.json({ "status": "failed", "message": "Please enter a valid email address!"});
	if(password == "")
		return res.json({ "status": "failed", "message": "Please enter password!"});

	db.findUserByEmail(email, function (err, rows) {
	    if (err) {
	    	console.log(err);
	    	return res.json({ "status": "failed", "message": "Error!" });
	    }

	    if(rows.length == 0)
    		return res.json({ "status": "failed", "message": "Unregistered Email!" });

		if(rows[0].password != password)
			return res.json({ "status": "failed", "message": "Invalid Password!" });

		var data = {
			"email" : email,
			"name": rows[0].name,
			"token": jwt.createToken(rows[0].userid)
		};
		console.log("working api");
		return res.json({ "status": "success", "message": "success", "data": data });
	});
});

router.post('/welcome', function(req, res, next) {
	var token = req.body.token;
	
	jwt.getUseridFromToken(token, function (err, result) {
		if(err) {
			return res.json({ "status": "failed", "message": "Invalid User... Please Login!", "code": "401" });
		}

		var userid = result;

		db.findUserByUserid(userid, function (err, rows) {
		    if (err) {
		    	console.log(err);
		    	return res.json({ "status": "failed", "message": "Invalid User... Please Login!", "code": "402" });
		    }

		    if(rows.length == 0)
	    		return res.json({ "status": "failed", "message": "Invalid User... Please Login!", "code": "403" });		    

		    var data = {};
		    data.name = rows[0].name;

			return res.json({ "status": "success", "message": "ok", "code": "200", "data": data });
		});
	});
});

module.exports = router;
