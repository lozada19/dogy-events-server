const { Schema, model } = require("mongoose");

const dogSchema = new Schema({

  namedog: {
    type: String,
    required: true,
  },
  dateofBirth: {
    type: String,
  },
  breed: {
    type: String,
  },
  aboutme: {
    type: String,
  },
  image: {
    type: String,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const DogModel = model("Dog", dogSchema);
module.exports = DogModel;
