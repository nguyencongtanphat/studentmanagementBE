const cors = require("cors"); 
const express = require("express"); 

const app = express();
app.use(cors());
app.use(express.json());


//REQUIRE ROUTES
const studentsRoute = require('./src/routes/students')
const classesRoute = require('./src/routes/classes')

app.use("/students", studentsRoute);
app.use("/classes", classesRoute);


app.use("*", (req, res) => {
  res.status(404).json({ error: "not found" });
});

module.exports = app;
