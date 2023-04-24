const express = require("express");
const route = express.Router();
const gradeController = require("../controllers/grades");

//add new Grade
route.post("/", gradeController.createGrade);
route.get("/", gradeController.getAllGrades);
route.put("/:id", gradeController.updateGrade);
route.get("/:id", gradeController.getGradeById);
route.delete("/:id", gradeController.deleteGradeById);

module.exports = route;