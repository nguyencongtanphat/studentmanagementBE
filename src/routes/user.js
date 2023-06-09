const express = require("express");
const route = express.Router();
const userController = require("../controllers/userController");

//tc = testController

route.post("/login", userController.login);


module.exports = route;
