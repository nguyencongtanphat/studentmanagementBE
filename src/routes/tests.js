const express = require("express");
const route = express.Router();
const tc = require("../controllers/tests")

//tc = testController

route.get("/", tc.getAllTest);
route.get("/:id", tc.getTestById);
route.put("/:id", tc.updateTest);

module.exports = route;