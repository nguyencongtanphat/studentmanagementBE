const express = require("express");
const route = express.Router();
const subjectController = require("../controllers/subjects");

//add new Grade
route.get("/", subjectController.getAllSubjects);
route.post("/", subjectController.createSubject);
route.get("/:id", subjectController.getSubjectById);
route.put("/:id", subjectController.updateSubject);
route.delete("/:id", subjectController.deleteSubjectById);

module.exports = route;
