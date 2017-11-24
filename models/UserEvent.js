const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userEventSchema = new Schema({
  user_id: { type : Schema.Types.ObjectId, ref:'User'},
  event_id: { type : Schema.Types.ObjectId, ref:'Event'},
});
const UserEvent = mongoose.model("UserEvent", userEventSchema);
module.exports = UserEvent;
