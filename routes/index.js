var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('users/index', { title: " Blog" });
});

router.get('/travel', function(req, res, next) {
  res.render('users/travel', { title: "Travel | Blog" });
});
router.get('/fashion', function(req, res, next) {
  res.render('users/fashion', { title: "Fashion | Blog" });
});
router.get('/about', function(req, res, next) {
  res.render('users/about', { title: "About | Blog" });
});
router.get('/contact', function(req, res, next) {
  res.render('users/contact', { title: "Contact | Blog" });
});
router.get('/single', function(req, res, next) {
  res.render('users/single', { title: "Contact | Blog",id: req.query.post_id});
});




module.exports = router;
