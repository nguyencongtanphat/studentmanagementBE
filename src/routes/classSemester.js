const express = require("express");
const route = express.Router();
const classSemesterController = require("../controllers/classSemester");

//add new class
route.get("/", classSemesterController.getAllClassesSemester);
route.get("/:id", classSemesterController.getClassesSemesterById);
route.post("/", classSemesterController.createClassesSemester);

module.exports = route;