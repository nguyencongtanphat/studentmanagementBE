const express = require("express");
const route = express.Router();
const SemesterReportController = require("../controllers/semesterReport");

//add new Semester
route.get("/", SemesterReportController.getSemesterReport);

module.exports = route;