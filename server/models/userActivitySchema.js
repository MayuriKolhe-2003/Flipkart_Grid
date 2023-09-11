const mongoose = require('mongoose');


const User = require('./userSchema');


const userAction = mongoose.Schema({
   userId: {
      type: mongoose.Schema.ObjectId,
      ref: User,
      required: true,
   },
   debited: {
      type: Boolean,
      default: false
   }
   ,
   credited: {
      type: Boolean,
      default: false
   }
   ,
   activity: {
      type: String,
      required: true
   },
   coins: {
      type: Number,

      required: true
   },
   productname: {
      type: String,

   },
   createdAt: {
      type: Date,
      default: Date()
   }

});

const userActivity = new mongoose.model("userActivity", userAction,);

module.exports = userActivity;
