const cors = require("cors"); 
const express = require("express"); 

const app = express();
app.use(cors());
app.use(express.json());


//REQUIRE ROUTES
const studentsRoute = require('./src/routes/students')

app.use("/students", studentsRoute);

// app.use("/", (req, res)=>{
//     res.send("hello world")
// });

app.use("*", (req, res) => {
  res.status(404).json({ error: "not found" });
});


module.exports = app;
