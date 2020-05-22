var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Shubham Tyagi's Blog" });
});

router.get('/travel', function(req, res, next) {
  res.render('travel', { title: "Travel | Shubham Tyagi's Blog" });
})
router.get('/fashion', function(req, res, next) {
  res.render('fashion', { title: "Fasthion | Shubham Tyagi's Blog" });
})
router.get('/about', function(req, res, next) {
  res.render('about', { title: "About | Shubham Tyagi's Blog" });
})
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: "Contact | Shubham Tyagi's Blog" });
})

module.exports = router;
