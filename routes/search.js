const express = require('express');
const Event = require('../models/Event');
const Game = require('../models/Game');
const UserEvent = require('../models/UserEvent');

const passport = require('passport');
const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login');
const router = express.Router();

router.get('/search', ensureLoggedIn(), (req, res, next) => {


  Event.find({}).sort({date: -1}).exec((err, listevents) => {
      if (err) { return next(err); }
      let promises = [];
      listevents.forEach(event => {
        promises.push(new Promise((resolve, reject) => {
          UserEvent.find({event_id: event._id}, (err, peopleJoined) => {
            event['participants'] = peopleJoined.length;
            resolve(event);
          });
        }));
      });
      Promise.all(promises).then(listevents => {
        Game.find({}, (err, listgames) => {
          if (err) { return next(err); }
          listevents = listevents.map(e => {
            let aux = e['game'];
            let gameCh = listgames.filter(g => g.name == aux);
            e['gameImg'] = gameCh[0];
            return e;
          });
          UserEvent.find({user_id: req.user._id}, {user_id: 0, _id: 0}, (err, eventsjoined)=>{
            eventsjoined = eventsjoined.map(e => ''+e.event_id);
            res.render('user/search', {
              listgames: listgames,
              listevents: listevents,
              eventsjoined: eventsjoined
            });
          });
        });
      });

  });
});

router.post('/search', ensureLoggedIn(), (req, res, next) => {
var filterName = req.body.game;
var filterUser = req.body.host;
var filterDate = req.body.date;
var filter = {game: filterName, 'host.host_name': filterUser, date: { $gt: new Date(filterDate)}};
if(filterUser == "" && filterDate == ""){
  filter = {game: filterName};
}if(filterUser !== "" && filterDate == ""){
  filter = {game: filterName, 'host.host_name': filterUser};
}if(filterUser == "" && filterDate !== ""){
  filter = {game: filterName, date: { $gt: new Date(filterDate)}};
}if(filterUser !== "" && filterDate !== ""){
  filter = {game: filterName, 'host.host_name': filterUser, date: { $gt: new Date(filterDate)}};
}
Event.find(filter).sort({date: -1}).exec((err, listevents) => {
    if (err) { return next(err); }
    listevents.forEach(event => {
      UserEvent.find({event_id: event._id}, (err, peopleJoined) => {
          event['participants'] = peopleJoined.length;
      });
    });
    Game.find({}, (err, listgames) => {
        if (err) { return next(err); }
        UserEvent.find({user_id: req.user._id}, (err, eventsjoined)=>{
      res.render('user/search', {
        listgames: listgames,
        listevents: listevents,
        eventsjoined: eventsjoined
      });

      });
    });
});

});

router.get('/search/:id', ensureLoggedIn(), (req, res, next) => {
  let id = req.params.id;
  Event.findById(id, (err, gamedetails) => {

    res.render('user/show/show-search', {
      gamedetails: gamedetails
    });
  });
});


router.post('/join-event', ensureLoggedIn(), (req, res, next) => {
let eventId = req.body.eventId;
let newUserEvent = new UserEvent({
  user_id: req.user._id,
  event_id: eventId
});
newUserEvent.save((err) => {
  if (err) { return next(err); }
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
            res.redirect('/search');
          });
     });
   });
});

});

router.post('/unjoin-event', (req, res, next) => {
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
              res.redirect('/search');
            });
       });
     });
  });
});
});

module.exports = router;
