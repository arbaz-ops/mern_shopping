const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const ProductsController = require("../controllers/products");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("jpeg or png image only acceptable"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get("/showProducts", ProductsController.get_all_products);

router.post(
  "/createProduct",
  upload.single("productImage"),
  ProductsController.create_product
);

router.get("/:productID", ProductsController.get_product);

router.patch("/:productID", ProductsController.update_product);

router.delete("/:productID", ProductsController.delete_product);

module.exports = router;
