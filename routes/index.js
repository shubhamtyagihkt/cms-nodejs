var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('users/index', { title: "Shubham Tyagi's Blog" });
});

router.get('/travel', function(req, res, next) {
  res.render('users/travel', { title: "Travel | Shubham Tyagi's Blog" });
})
router.get('/fashion', function(req, res, next) {
  res.render('users/fashion', { title: "Fasthion | Shubham Tyagi's Blog" });
})
router.get('/about', function(req, res, next) {
  res.render('users/about', { title: "About | Shubham Tyagi's Blog" });
})
router.get('/contact', function(req, res, next) {
  res.render('users/contact', { title: "Contact | Shubham Tyagi's Blog" });
})




module.exports = router;
