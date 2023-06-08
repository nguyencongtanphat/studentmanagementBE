const express = require("express");
const route = express.Router();
const subjectScoreController = require("../controllers/subjectScore");


//add new class
route.post("/", subjectScoreController.createSubjectScore);
route.get("/details", subjectScoreController.getSubjectScoreDetails);
route.get("/scores", subjectScoreController.getListOfStudentScores);

module.exports = route;
