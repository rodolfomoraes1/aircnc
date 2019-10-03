const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String
  //age: Number,
  //name: String,
  //active: Boolean
});

module.exports = mongoose.model("User", UserSchema);
