const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jumplingSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    unique: true,
  },
});

const JumplingModel = mongoose.model("Song", jumplingSchema);
module.exports = JumplingModel;
