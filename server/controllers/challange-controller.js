const Challange = require("../models/ChallangesSchema");
const userBrand = require('../models/Brands_PurchesSchema')

const addChallange = async (req, res) => {
  const chData = req.body;
  try {
    const cha = new Challange(chData);
    const savedcha = await cha.save();
    res.json(savedcha);
    //res.status(200).send("product added");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};


const getChallange = async (req, res) => {
  try {
    const result = await Challange.find({});
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getBrandsInfo = async (req, res) => {

  const userId = req.query.id;
  const resp = await userBrand.findOne({ userId });
  console.log(resp);
  res.send(resp);

}

// reset the numebr of products  t

const resetBrand = async (req, res) => {

  const userId = req.query.id;
  const sellerid = req.query.seller;

  try {
    const resp = await userBrand.updateOne({ userId, "Brand.seller": sellerid }, { $set: { "Brand.$.qty": 0 } })
    res.send(resp);
  }
  catch (e) {
    res.send(e);

  }
}


module.exports = { addChallange, getChallange, getBrandsInfo,resetBrand }