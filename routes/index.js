const express = require('express');
const {ensureLoggedIn, ensureLoggedOut} = require('connect-ensure-login');
const router  = express.Router();
const Event = require('../models/Event');
const Game = require('../models/Game');
const User = require('../models/User');


/* Landing Page */
router.get('/', (req, res, next) => {
  res.render('index', {user: req.user});
});

/* Games Index*/
router.get('/games', ensureLoggedIn(), (req, res, next)  => {
  Game.find({}, (err, listgames) => {
      if (err) { return next(err); }
    res.render('user/gamelist', {
      listgames : listgames,
      });
    });
});

/* Edit Profile*/

router.get('/edit-your-profile/:id', (req, res, next) => {
  User.findOne({_id: req.user._id}, (err, user) => {
      if (err) { return next(err); }
    res.render('user/editYourProfile', {
      user: user
    });
  });
});

router.post('/edit-your-profile/:id', (req, res, next) => {
  const userId = req.params.id;
  const updates = {
    username: req.body.username,
    email: req.body.email,
    city: req.body.city,
  };
  User.findByIdAndUpdate(userId, updates, (err, userId) => {
    if (err){ return next(err); }
    return res.redirect('/userProfile');
  });
});



module.exports = router;
