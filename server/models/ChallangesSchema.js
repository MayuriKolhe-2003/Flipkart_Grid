const mongoose = require("mongoose");

const ChallangesSchema = mongoose.Schema({
    seller:{
        id:String,
        name:String
    },
    coinsRewarded : Number,
    transactionsRequired : Number
})

const Challange = new mongoose.model("challange", ChallangesSchema);

module.exports = Challange;