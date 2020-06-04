const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  quantity: {
    type: Number,
    default: 1,
    required: true
  },
  c_name: {
    type: String,
    required: true
  },
  c_ph_number: {
    type: String,
    required: true
  },
  c_address: {
    type: String,
    required: true
  },
  size: {
    required: true,
    type: String
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  }
});

module.exports = mongoose.model("Order", orderSchema);
