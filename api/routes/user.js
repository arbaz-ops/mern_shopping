const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const UsersController = require("../controllers/users");

router.get("/", UsersController.user_all);

router.post("/register", UsersController.user_register);

router.post("/login", UsersController.user_login);

router.delete("/:id", UsersController.user_delete);

module.exports = router;
