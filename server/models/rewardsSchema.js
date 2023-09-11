const mongoose = require("mongoose");

const rewardsSchema = mongoose.Schema({
    title:String,
    coins:Number,
    desc:String,
    image:String,
  });
  
  const Reward = new mongoose.model("reward", rewardsSchema);
  
  module.exports = Reward;
  