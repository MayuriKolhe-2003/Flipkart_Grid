const mongoose = require('mongoose');

const approve = mongoose.Schema({
    userId: {
        type : String,
        required: true,
    },
    Amount: {
        type: Number,
        required: true,
    },
    userId2: {
        type : String
    },
    Amount2: {
        type: Number
    },
    isMultiple: {
        type: Boolean,
        default: false
    }
})

const approval = new mongoose.model("Approve", approve);

module.exports = approval;