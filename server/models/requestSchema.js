//userid: 
//sellerid
//userwallet
//coins

const mongoose = require("mongoose");

const request = mongoose.Schema({
    userid : mongoose.Schema.ObjectId,
    sellerid :  mongoose.Schema.ObjectId,
    userwallet : String,
    coins : Number
})

const brandrequest = new mongoose.model("request", request);

module.exports = brandrequest;