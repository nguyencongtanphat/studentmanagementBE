const cors = require("cors"); 
const express = require("express"); 

const app = express();
app.use(cors());
app.use(express.json());


//REQUIRE ROUTES
const studentsRoute = require('./src/routes/students')
const classesRoute = require('./src/routes/classes')
const teacherRoute = require('./src/routes/teachers')
const subjectRoute = require('./src/routes/subjects')
const semesterRoute = require('./src/routes/semesters')
const gradeRoute = require('./src/routes/grades')
const testRoute = require('./src/routes/tests')
const subjectScoreRoute = require('./src/routes/subject-score')


app.use("/students", studentsRoute);
app.use("/classes", classesRoute);
app.use("/teachers", teacherRoute);
app.use("/semesters", semesterRoute);
app.use("/grades", gradeRoute);
app.use("/tests", testRoute);
app.use("/subject-score", subjectScoreRoute);

app.use("*", (req, res) => {
  res.status(404).json({ error: "not found" });
});

module.exports = app;
