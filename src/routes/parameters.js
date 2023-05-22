const express = require("express");
const route = express.Router();
const parameterController = require("../controllers/parameters");

//add new class
route.get("/", parameterController.getParameters);



module.exports = route;
