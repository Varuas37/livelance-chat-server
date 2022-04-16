const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: String
})

module.exports = mongoose.model("Users", userSchema);
