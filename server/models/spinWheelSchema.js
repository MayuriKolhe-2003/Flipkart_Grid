const mongoose = require("mongoose");
const User = require('./userSchema');


const SpinWheel = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref:User,
    required: true,
  },
  isSpinned: {
    type: Boolean,
    default:false
  },
});

const Spin = new mongoose.model("spin", SpinWheel,);

module.exports = Spin;
