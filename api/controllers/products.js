const mongoose = require("mongoose");
const Product = require("../models/product");

module.exports.get_all_products = async (req, res, next) => {
  try {
    const products = await Product.find().select(
      "name price _id productImage description size brand"
    );
    const count = products.length;
    console.log(products);
    res.status(200).json({
      message: "Successfuly fetched...",
      counts: count,
      products: products.map(result => {
        return {
          _id: result._id,
          name: result.name,
          brand: result.brand,
          price: result.price,
          description: result.description,
          size: result.size,
          productImage: result.productImage,
          request: {
            method: "GET",
            url: "http://" + req.hostname + ":5000/products/" + result._id
          }
        };
      })
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message
    });
  }
};

module.exports.create_product = async (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    brand: req.body.brand,
    description: req.body.description,
    size: req.body.size,
    productImage: req.file.path,
    request: {
      method: "GET",
      message: "See all products...",
      url: "http://" + req.hostname + ":5000/products"
    }
  });

  await product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Product Created Successfully",
        productDetails: result,
        request: {
          method: "GET",
          message: "See all products...",
          url: "http://" + req.hostname + ":5000/products"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err.message
      });
    });
};

module.exports.get_product = async (req, res, next) => {
  try {
    const result = await Product.findById({ _id: req.params.productID }).select(
      "price name _id productImage description size brand"
    );
    res.status(200).json({
      message: "Successfully fetched...",
      productDetails: result,
      request: {
        method: "GET",
        message: "See all products...",
        url: "http://" + req.hostname + ":5000/products"
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message
    });
  }
};

module.exports.update_product = async (req, res, next) => {
  const id = req.params.productID;

  try {
    const result = await Product.update({ _id: id }, { $set: req.body });
    res.status(200).json({
      message: "Product Updated...",
      productDetails: result
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message
    });
  }
};

module.exports.delete_product = async (req, res, next) => {
  try {
    const result = await Product.findOneAndDelete({
      _id: req.params.productID
    }).select("price name _id productImage description size brand");
    console.log(result);
    res.status(200).json({
      message: "Product Deleted...",
      productDetails: result,
      request: {
        method: "GET",
        message: "See all products...",
        url: "http://" + req.hostname + ":5000/products"
      }
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message
    });
  }
};
