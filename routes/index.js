var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (!req.session.account) {
    res.redirect('/login');
  }
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.post('/login', function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  req.session.account = {
    username
  }
  res.redirect('/');
});


router.get('/user-info', function(req, res, next) {
  res.json({userInfo: req.session.account});
});


module.exports = router;
