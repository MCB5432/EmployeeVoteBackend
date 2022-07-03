const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  time: {
    required: true,
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('Events',eventSchema);
