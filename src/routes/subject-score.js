const express = require("express");
const route = express.Router();
const subjectScoreController = require("../controllers/subjectScore");

//add new class
route.post("/", subjectScoreController.createSubjectScore);
route.get("/", subjectScoreController.getSubjectScore);


module.exports = route;
