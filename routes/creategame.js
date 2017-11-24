const express = require('express');
const Event = require('../models/Event');
const Game = require('../models/Game');
const UserEvent = require('../models/UserEvent');
const passport = require('passport');
const {ensureLoggedIn, ensureLoggedOut} = require('connect-ensure-login');
const router  = express.Router();



router.get('/newMeeting', ensureLoggedIn(), (req, res, next)  => {
  Game.find({}, (err, listgames) => {
      if (err) { return next(err); }
    res.render('user/newMeeting', {
      listgames: listgames
    });
  });
});

router.post('/newMeeting', (req, res, next) => {


  const newEvent = {
    name: req.body.name,
    game : req.body.game,
    host: {
      host_id: req.user._id,
      host_name: req.user.username
    },
    city: req.body.city,
    adress : req.body.adress,
    date : req.body.date,
    expertiseLevel: req.body.expertiseLevel,
    maxPlayers: req.body.maxPlayers,
    minPlayers: req.body.minPlayers,
    status: "insufficientPlayers",
    approxDuration: req.body.approxDuration,
    description: req.body.description,
    dressCode: req.body.dressCode,
  };

const userEvent = new Event(newEvent);

userEvent.save()
  .then(event=> {
    const newConexion = new UserEvent({
      user_id: req.user._id,
      event_id : event._id
    });
    newConexion.save()
      .then(newC => {
        res.redirect('/userProfile');
      });
  })
  .catch(err => next(err));
  });




router.get('/edit/:id', (req, res, next) => {
  const eventId = req.params.id;
    Game.find({}).then(listgames => {
      Event.findById(eventId, (err, evento) => {
        if (err) { return next(err); }
          res.render('user/edit', {
            evento : evento,
            listgames: listgames,
          });
      });
    });
  });

  router.post('/edit/:id', (req, res, next) => {
    const eventId = req.params.id;
    const updates = {
      name: req.body.name,
      game : req.body.game,
      host: {
        host_id: req.user._id,
        host_name: req.user.username
      },
      city: req.body.city,
      adress : req.body.adress,
      date : req.body.date,
      expertiseLevel: req.body.expertiseLevel,
      maxPlayers: req.body.maxPlayers,
      minPlayers: req.body.minPlayers,
      status: "insufficientPlayers",
      approxDuration: req.body.approxDuration,
      description: req.body.description,
      dressCode: req.body.dressCode,
    };

    Event.findByIdAndUpdate(eventId, updates, (err, evento) => {
      if (err){ return next(err); }
      return res.redirect('/userProfile');
    });
  });

  router.post('/:id/delete', (req, res, next) => {
    const eventId = req.params.id;
    Event.findByIdAndRemove(eventId, (err, eventId) => {
    if (err){ return next(err); }
    return res.redirect('/userProfile');
  });
 });


module.exports = router;
