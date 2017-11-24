const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const gameSchema = new Schema({
  name: String,
  description: String,
  maxPlayers: Number,
  img: String
});

const Game = mongoose.model("Game", gameSchema);
module.exports = Game;
