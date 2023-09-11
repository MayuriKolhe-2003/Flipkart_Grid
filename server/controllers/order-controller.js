const Order = require("../models/orderSchema");
const userBrand = require('../models/Brands_PurchesSchema')
const mongoose = require("mongoose");

const completeOrder = async (req, res) => {
  //console.log(req.body.items);
  const seller = req.body.items;
  seller.map((it) => {
    console.log(it)
    console.log(it.seller.id)
  })
  try {


    const order = new Order({ ...req.body, orderDate: Date.now() });
    const result = await order.save();
    const userId = req.body.userId;
    const seller = req.body.items;

    const user = await userBrand.findOne({ userId });

    if (!user) {
      const re = await userBrand.create({ userId });


    }

    seller.map(async (it) => {

      const resp = await userBrand.updateOne({ userId, "Brand.seller": it.seller.id }, { $inc: { "Brand.$.qty": it.qty } });
      console.log(resp)
      if (resp.matchedCount == 0) {
        const pushUpdate = {
          $push: {
            Brand: {
              seller: it.seller.id,
              brandName: it.seller.name,
              qty: it.qty
            }
          }
        };
        await userBrand.updateOne({ userId }, pushUpdate);
      }

    })


    //const resp =    await userBrand.updateOne({userId},{user});
    const resp = await userBrand.findOne({ userId })

    res.json({ mess: "message", resp });

    //res.json({ orderId: result._id });
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const uId = mongoose.Types.ObjectId(req.body.userId);
    const result = await Order.aggregate([
      {
        $match: {
          userId: uId,
          paymentStatus: "Completed",
        },
      },
      {
        $lookup: {
          from: "products",
          localField: "items.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $lookup: {
          from: "addresses",
          localField: "addressId",
          foreignField: "_id",
          as: "addressDetails",
        },
      },
      {
        $unwind: "$addressDetails",
      },
      { $sort: { orderDate: -1 } },
    ]);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
};

const getOrders = async (req, res) => {
  try {
    const result = await Order.find({});
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = { completeOrder, getOrderDetails ,getOrders};