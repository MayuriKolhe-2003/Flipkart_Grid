const mongoose = require("mongoose");

const BransPurches = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  Brand:[
    {
        seller: {
            type: mongoose.Schema.ObjectId,
            required: true,
          },
          brandName:{
            type:String,
            required:true
          },
          qty:{
            type:Number,
            default :0
          }
    }
  ]
});

const userBrand = new mongoose.model("userbrandpurches", BransPurches);

module.exports = userBrand;