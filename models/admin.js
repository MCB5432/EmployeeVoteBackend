const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    username: {
      required: true,
      type: String,
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    token: { type: String }
    
})
module.exports = mongoose.model("admin", adminSchema);