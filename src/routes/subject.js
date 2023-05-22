const express = require("express");
const route = express.Router();
const subjectController = require("../controllers/subjects");

//add new Grade
route.get("/", subjectController.getAllSubjects);
route.get("/:id", subjectController.getSubjectById);

module.exports = route;
