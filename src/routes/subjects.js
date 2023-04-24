const express = require("express");
const route = express.Router();
const subjectController = require("../controllers/subjects");

//add new Subject
route.post("/", subjectController.createSubject);
route.get("/", subjectController.getAllSubjects);
route.put("/:id", subjectController.updateSubject);
route.get("/:id", subjectController.getSubjectById);
route.delete("/:id", subjectController.deleteSubjectById);

module.exports = route;