const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jumplingSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    unique: true,
    collation: { locale: "en", strength: 2 },
  },
});

const JumplingModel = mongoose.model("Jumpling", jumplingSchema);
module.exports = JumplingModel;
