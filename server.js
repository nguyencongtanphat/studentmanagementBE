const cors = require("cors"); 
const express = require("express"); 

const app = express();
app.use(cors());
app.use(express.json());


//REQUIRE ROUTES
const studentsRoute = require('./src/routes/students')
const classesRoute = require('./src/routes/classes')

app.use("/students", studentsRoute);

// app.use("/", (req, res)=>{
//     res.send("hello world")
// });

app.use("*", (req, res) => {
  res.status(404).json({ error: "not found" });
});

app.use("/class", classesRoute);

app.use("/classes", (req, res)=>{
  res.send("tí code tiếp")
});

module.exports = app;
