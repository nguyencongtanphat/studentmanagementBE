const express = require("express");
const route = express.Router();
const subjectReportController = require("../controllers/subjectReport");

//add new class
route.get("/", subjectReportController.getSubjectReport);

module.exports = route;
