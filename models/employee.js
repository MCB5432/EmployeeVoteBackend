const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  surname: {
    required: true,
    type: String,
  },
  position: {
    required: true,
    type: String,
  },
  gender: {
    required: true,
    type: String,
  },

  point: {
    required: true,
    type: Number,
    default: 0,
  },
  picture: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  phone: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model("Employees", employeeSchema);
