const express = require('express');
const Event = require('../models/Event');
const Game = require('../models/Game');
const passport = require('passport');
const UserEvent = require('../models/UserEvent');
const {ensureLoggedIn, ensureLoggedOut} = require('connect-ensure-login');
const router  = express.Router();


router.get('/userProfile', ensureLoggedIn(), (req, res, next) => {
UserEvent.find({user_id: req.user._id}, {user_id: 0, _id: 0}, (err, eventsjoined)=>{
  if (err) { return next(err); }
  eventsjoined = eventsjoined.map(e => ''+e.event_id);
  Event.find({ _id: {$in: eventsjoined}}, (err, listevent) => {
    let promises = [];
    listevent.forEach(event => {
      promises.push(new Promise((resolve, reject) => {
        UserEvent.find({event_id: event._id}, (err, peopleJoined) => {
          event['participants'] = peopleJoined.length;
          resolve(event);
        });
      }));
    });
    Promise.all(promises).then(events => {
      res.render('user/index', {
        listevent: listevent,
        });
    });
    });
  });
});



router.post('/unjoin-game', (req, res, next) => {
let eventId = req.body.eventId;
UserEvent.find({user_id: req.user._id, event_id: eventId}, (err, eventodelete)=>{
  if (err) { return next(err); }
  var eliminate = eventodelete[0]._id;
  UserEvent.findByIdAndRemove(eliminate, (err, product) => {
    if (err){ return next(err); }
    Event.findOne({_id: eventId}, (err, evento) => {
       UserEvent.find({event_id: eventId}, (err, peopleJoined) => {
         let statusUpdated = '';
            if(evento.maxPlayers === peopleJoined.length){
              statusUpdated = 'full';
            } else if(evento.minPlayers > peopleJoined.length) {
              statusUpdated = 'insufficientPlayers';
            } else {
              statusUpdated = 'open&running';
            }
            Event.update({ _id: eventId }, { $set : {status: statusUpdated}}, (err, respuesta) =>{
              res.redirect('/userProfile');
            });
       });
     });
  });
});
});



router.get('/home/:id', ensureLoggedIn(), (req, res, next) => {
  let id = req.params.id;
  Event.findById(id, (err, gamedetails) => {
    res.render('user/show/show-home', {
      gamedetails: gamedetails
    });
  });
});

module.exports = router;
