const express = require("express");
const route = express.Router();
const parameterController = require("../controllers/parameters");

//add new class
route.get("/", parameterController.getParameters);
route.put("/update", parameterController.updateParameter);


module.exports = route;
