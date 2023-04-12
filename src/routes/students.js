const express = require("express");
const route = express.Router();
const studentController = require("../controllers/students");

//add new student
//route.post("/", studentController.create);
//get all students
route.get("/", studentController.getAllStudents);
//get student by id
route.get("/:id", studentController.getStudentById);

// route.get("/newest", studentController.getNewestBlogs);
// route.get("/:id", studentController.getBlogByID);

module.exports = route;
