const express = require("express");
const route = express.Router();
const classController = require("../controllers/classes");

//add new class
route.post("/", classController.createClass);
route.post("/:id/add", classController.addStudentToClassApi);
route.get("/", classController.getAllClasses);
route.put("/:id", classController.updateClass);
route.get("/:id", classController.getClassById);
route.delete("/:id", classController.deleteClassById);

module.exports = route;
