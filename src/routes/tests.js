const express = require("express");
const route = express.Router();
const tc = require("../controllers/tests")

//tc = testController

route.get("/", tc.getAllTest);
route.get("/:id", tc.getTestById);
route.post("/", tc.createTest);
route.put("/:id", tc.updateTest);
route.delete("/:id", tc.deleteTest);

module.exports = route;