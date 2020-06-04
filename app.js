const express = require("express");
const app = express();
const port = 5000;
const userRoute = require("./api/routes/user");
const productRoute = require("./api/routes/product");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const orderRoute = require("./api/routes/order");

app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

dotenv.config();

mongoose.connect(
  process.env.DB_CONNECT,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  },
  (err, result) => {
    if (err) {
      console.log("DB not connected....");
    } else {
      console.log("DB connected successfully...");
    }
  }
);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/user", userRoute);

//Products Middleware
app.use("/products", productRoute);

app.use("/uploads", express.static("uploads"));

//Orders Middleware
app.use("/orders", orderRoute);

app.listen(port, () => console.log(`Listening on http://localhost:${port}/`));
