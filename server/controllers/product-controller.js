const Product = require("../models/productSchema");

const getProducts = async (req, res) => {
  try {
    const result = await Product.find({});
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getProductsByCategory = async (req, res) => {
  const cName = req.params.categoryName;
  try {
    if (cName === "top deals") {
      const result = await Product.find({}).skip(15);
      res.json(result);
    } else if (cName === "top offers") {
      const result = await Product.find({}).skip(5);
      res.json(result);
    } else {
      const result = await Product.find({ category: cName });
      res.json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const result = await Product.findById(productId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const getProductBySeller = async (req, res) => {
  const sellerID = req.params.sellerid;
  //console.log(sellerID)
  try {
    const result = await Product.find({"seller.id": sellerID});
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

const addProduct = async (req, res) => {
  const productData = req.body;
  try {
    const product = new Product(productData);
    const savedProduct = await product.save();
    res.json(savedProduct);
    //res.status(200).send("product added");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};

module.exports = {
  getProducts,
  getProductsByCategory,
  getProductById,
  addProduct,
  getProductBySeller
};
