var db = require('../db.js');
var config = require('../config');


var funcs = {};




funcs.getAllPosts = function(callback) {
	var qry = 'SELECT * FROM posts';
	
	db.get().query(qry, function (err, result) {
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


// funcs.addElement = function(description, status, callback) {
// 	var qry = 'INSERT INTO items (description, status) VALUES (?, ?)';

// 	db.get().query(qry, [description, status], function (err, result) {
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
