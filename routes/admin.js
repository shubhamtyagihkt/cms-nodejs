var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {
  res.render('admin/admin-login', { title: "Login | CMS" ,layout:'admin-layout'});
});
router.get('/register', function(req, res, next) {
  res.render('admin/admin-register', { title: "Register | CMS" ,layout:'admin-layout'});
});
router.get('/pages', function(req, res, next) {
  res.render('admin/admin-pages', { title: "Contact | CMS" ,layout:'admin-layout'});
});
router.get('/users', function(req, res, next) {
  res.render('admin/admin-users', { title: "Users | CMS" ,layout:'admin-layout'});
});
router.get('/posts', function(req, res, next) {
  res.render('admin/admin-posts', { title: "Posts | CMS" ,layout:'admin-layout'});
});

router.get('/edit', function(req, res, next) {
  res.render('admin/admin-edit', { title: "Edit | CMS" ,layout:'admin-layout',id: req.query.post_id});
});

router.get('/index', function(req, res, next) {
  res.render('admin/admin-index', { title: "HomePage | CMS" ,layout:'admin-layout'});
});

router.get('/add', function(req, res, next) {
  res.render('admin/admin-add', { title: "Add Post | CMS" ,layout:'admin-layout'});
});

router.get('/welcome', function(req, res, next) {
	res.render('admin/admin-welcome', { title: 'Welcome' ,layout:'admin-layout'});
});

module.exports = router;