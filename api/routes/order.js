const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const OrderController = require("../controllers/orders");

router.get("/getOrders", OrderController.orders_get_all_orders);

router.post("/createOrder", OrderController.orders_create_order);

module.exports = router;
