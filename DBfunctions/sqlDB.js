var db = require('../db.js');
// var config = require('../config');


var funcs = {};




funcs.getAllPosts = function(callback) {
	var qry = 'SELECT * FROM posts';
	
	db.get().query(qry, function (err, result) {
		return callback(err, result);
	});
	
	return true;
}

funcs.getSinglePost = function(id,callback) {
	var qry = 'SELECT * FROM posts WHERE post_id = ?';
	
	db.get().query(qry, [id] ,function (err, result) {
		return callback(err, result);
	});
	
	return true;
}

funcs.updatePost = function(id,title,description,image_url,category,callback) {
	var qry = 'UPDATE posts SET title = ?, description = ?, image_url = ? , category_id = ? WHERE post_id = 1';

	db.get().query(qry, [title,description,image_url,category], function (err, result) {
		return callback(err, result);
	});

	return true;
}
funcs.deletePost = function(id,callback) {
	var qry = 'DELETE FROM posts WHERE post_id = ? ';
	
	db.get().query(qry, [id], function (err, result) {
		return callback(err, result);
	});

	return true;
}

funcs.createPost = function(title,description,image_url,category, userid ,callback) {
	var qry = 'INSERT INTO posts (title, description, image_url, category_id,user_id) VALUES ( ?, ?, ?, ?, ?) ';
 
	db.get().query(qry, [title,description,image_url,category,userid], function (err, result) {
		return callback(err, result);
	});

	return true;
}

// funcs.getCategoryItems = function(status, callback) {
// 	var qry = 'SELECT * FROM items WHERE status = ?';

// 	db.get().query(qry, [status], function (err, result) {
// 		return callback(err, result);
// 	});

// 	return true;
// }


// funcs.changeStatus = function(id, status, callback) {
// 	var qry = 'UPDATE items SET status = ? WHERE id = ?';

// 	db.get().query(qry, [status, id], function (err, result) {
// 		return callback(err, result);
// 	});

// 	return true;
// }




// funcs.editItem = function(id, description, callback) {
// 	var qry = 'UPDATE items SET description = ? WHERE id = ?';

// 	db.get().query(qry, [description, id], function (err, result) {
// 		return callback(err, result);
// 	});

// 	return true;
// }


module.exports = funcs;
