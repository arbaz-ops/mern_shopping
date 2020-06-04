const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: { type: String, required: true },
  size: { type: Array, required: true },
  brand: { type: String },
  productImage: { type: String, required: true }
});

module.exports = mongoose.model("Product", productSchema);
