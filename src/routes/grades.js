const express = require("express");
const route = express.Router();
const gradeController = require("../controllers/grades");

//add new Grade
route.get("/", gradeController.getAllGrades);
route.get("/:id", gradeController.getGradeById);

module.exports = route;