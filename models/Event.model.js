const { Schema, model } = require("mongoose");

const eventSchema = new Schema({
  eventname: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  },
  address: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  pet: [
    {
      type: Schema.Types.ObjectId,
      ref: "Dog",
    },
  ],
});

const EventModel = model("Event", eventSchema);
module.exports = EventModel;
