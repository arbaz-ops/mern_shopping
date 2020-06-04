const Product = require("../models/product");
const Order = require("../models/order");
const mongoose = require("mongoose");

module.exports.orders_get_all_orders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .select("_id productId c_name c_ph_number c_address size")
      .populate(
        "product",
        "_id size name price brand description productImage",
        "Product"
      );
    if (orders.length < 1) {
      console.log("Orders Not Found...");
      res.status(401).json({
        message: "Orders Not Found..."
      });
    } else {
      res.status(200).json({
        message: "Successfully fetched...",
        counts: orders.length,
        orderDetails: orders.map(result => {
          return {
            _id: result._id,
            productId: result.productId,
            c_name: result.c_name,
            c_ph_number: result.c_ph_number,
            c_address: result.c_address,
            size: result.size,
            request: {
              method: "GET",
              url: "http://" + req.hostname + ":5000/orders/" + result._id
            }
          };
        })
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message
    });
  }
};

module.exports.orders_create_order = async (req, res, next) => {
  Product.findById(req.body.productId, (err, result) => {
    if (err) {
      res.status(404).json({
        error: "Product Not Found..."
      });
    } else {
      const newOrder = new Order({
        _id: new mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        c_name: req.body.c_name,
        c_ph_number: req.body.c_ph_number,
        c_address: req.body.c_address,
        size: req.body.size,
        productId: req.body.productId
      });
      newOrder
        .save()
        .then(result => {
          res.status(201).json({
            message: "Order Created...",
            orderDetails: result,
            request: {
              method: "GET",
              url: "http://" + req.hostname + ":5000/orders/" + result._id
            }
          });
        })
        .catch(err => {
          res.status(500).json({
            error: err.message
          });
        });
    }
  });
};
