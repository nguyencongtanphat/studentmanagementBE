const express = require("express");
const route = express.Router();
const studentController = require("../controllers/students");

//update student
route.put("/:id", studentController.updateStudent);
//add new student
route.post("/", studentController.createStudent);
//get student in specific class
route.get("/inclass", studentController.getStudentInClass);
//get student progresses
route.get("/progress", studentController.getStudentProgresses);
//get all students
route.get("/", studentController.getAllStudents);
//get student by id
route.get("/:id", studentController.getStudentById);

module.exports = route;
