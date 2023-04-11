const express = require("express");
const route = express.Router();
const studentController = require("../controllers/students");

//add new student
route.post("/", studentController.create);
route.get("/", studentController.getAllStudents);
// route.get("/newest", studentController.getNewestBlogs);
// route.get("/:id", studentController.getBlogByID);

module.exports = route;
