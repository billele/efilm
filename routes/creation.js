var express = require('express');
var router = express.Router();
var validator = require('validator');
var bcrypt = require('bcrypt');

const User = require('../models/User');


router.get('/created', function(req, res, next) {
  res.render('user/created', {title: 'créer un nouvel utilisateur ou connecté vous!', errors:[]});
});



router.post('/creation', async function(req, res, next) {
  var userInfo = req.body;
  var errors = [];
  console.log(userInfo.lastname);
  if (!validator.isEmail(userInfo.email)){
    errors.push("invalid email");
  }
  if (userInfo.firstname.length < 2 || userInfo.firstname.length > 25){
    errors.push("firstname has to be between 2 and 25");
  }
  if (userInfo.lastname.length < 2 || userInfo.lastname.length > 25){
    errors.push("lastname has to be between 2 and 25");
  }
  if (userInfo.password != userInfo.passwordConfirmation){
    errors.push("passwords have to match");
  }

  if (errors.length > 0) {
    res.render('user/created', {title: 'créer un nouvel utilisateur', errors: errors});
    return;
  }
  var encryptedPassword = await bcrypt.hash(userInfo.password, 10);
  console.log(bcrypt.hash);
  var user = new User ();
  user.name = {
    first : userInfo.firstname,
    last : userInfo.lastname
  };
  user.email = userInfo.email;
  user.password = encryptedPassword;
  try {
    await user.save();
    res.render('user/userCreated');
  } catch(err) {
    next(err);
  }

});

router.post('/login', async function(req, res, next) {
  var credentials = req.body;
  if (!credentials.email || !credentials.password) {
    res.render("index", {
      errors : [ "Missing email or password" ]
    });
  }

  try {
    var user = await User.findOne()
    .where('email').eq(credentials.email)
    .exec();

    if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
      res.render("index", {
        errors : [ "Invalid email or password" ]
      });
      return;
    }

    console.log("Successfully logged in");
    req.session.user = user;

    res.render("index", { user : user });

  } catch(err) {
    next(err);
  }

});

router.all('/logout', async function(req, res, next) {
  res.locals.user = null;
  req.session.destroy();
  res.render("index");
});



module.exports = router;
