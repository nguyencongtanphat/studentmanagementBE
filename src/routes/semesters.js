const express = require("express");
const route = express.Router();
const SemesterController = require("../controllers/semesters");

//add new Semester
route.post("/", SemesterController.createSemester);
route.get("/", SemesterController.getAllSemesters);
route.put("/:id", SemesterController.updateSemester);
route.get("/:id", SemesterController.getSemesterById);
route.delete("/:id", SemesterController.deleteSemesterById);

module.exports = route;