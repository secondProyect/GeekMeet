const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const eventSchema = new Schema({
  name: String,
  game : String,
  host: {
    host_id: { type : Schema.Types.ObjectId, ref:'User'},
    host_name: String
  },
  city: String,
  adress : String,
  date : Date,
  expertiseLevel: {
    type: String,
    enum : ['Open to anyone', '+2 games played', '+10 games played', '+50 games'],
    default : 'Open to anyone'
  },
  maxPlayers: Number,
  minPlayers: Number,
  status: {
    type: String,
    enum : ['insufficientPlayers', 'open&running', 'full'],
    default : 'insufficientPlayers'
  },
  approxDuration: String,
  description: String,
  dressCode: String,
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
