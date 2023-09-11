const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  items: [
    {
      productId: {
        type: mongoose.Schema.ObjectId,
        required: true,
      },
      seller:{
        id:mongoose.Schema.ObjectId,
        name:String
      },
      qty: Number,
      price: Number,
    },
  ],
  userId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  addressId: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentMode: {
    type: String,
    required: true,
  },
  transactionId: String,
  paymentStatus:String,
  orderDate: Date,
  coinsUsed : {
    type:Number,
    default:0
  }
});

const Order = new mongoose.model("order", orderSchema);

module.exports = Order;