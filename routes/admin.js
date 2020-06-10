var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
  res.render('admin/admin-login', { title: "Contact | Shubham Tyagi's Blog" ,layout:'admin-layout'});
});
router.get('/pages', function(req, res, next) {
  res.render('admin/admin-pages', { title: "Contact | Shubham Tyagi's Blog" ,layout:'admin-layout'});
});
router.get('/users', function(req, res, next) {
  res.render('admin/admin-users', { title: "Contact | Shubham Tyagi's Blog" ,layout:'admin-layout'});
});
router.get('/posts', function(req, res, next) {
  res.render('admin/admin-posts', { title: "Contact | Shubham Tyagi's Blog" ,layout:'admin-layout'});
});

router.get('/edit', function(req, res, next) {
  res.render('admin/admin-edit', { title: "Contact | Shubham Tyagi's Blog" ,layout:'admin-layout',id: req.query.post_id});
});

router.get('/index', function(req, res, next) {
  res.render('admin/admin-index', { title: "Contact | Shubham Tyagi's Blog" ,layout:'admin-layout'});
});

router.get('/add', function(req, res, next) {
  res.render('admin/admin-add', { title: "Contact | Shubham Tyagi's Blog" ,layout:'admin-layout'});
});

module.exports = router;