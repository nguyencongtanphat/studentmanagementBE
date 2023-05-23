const studentModel = require("../models/student");
const semesterModel = require("../models/semester");
const parameterModel = require("../models/parameter");
const progressModel = require("../models/studentprogress");
const Response = require("../utils/response");
const Class = require("../models/class");
const { QueryTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");
const { addStudentsToClassSemester } = require("./classSemester");

class studentController {
  static async getAllStudents(req, res, next) {
    try {
      const isGetClass = req.query.isGetClass;
      let students = await studentModel.findAll();
      if (!students) {
        throw "Something went wrong please wait a minute and try again";
      }
      if (isGetClass) {
        let newStudents = [];
        for (let i = 0; i < students.length; i++) {
          //find the class of a student
          const classStudent = await students[i].getClasses();
          const classNames = classStudent.map((classObj) => classObj.name);
          newStudents.push({ ...students[i]["dataValues"], classNames });
        }
        students = newStudents;
      }
      return res.status(200).json(Response.successResponse(students));
    } catch (err) {
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }

  static async getStudentById(req, res, next) {
    try {
      const id = req.params.id;
      //find the student
      const student = await studentModel.findByPk(id);
      //find all the class students learn
      const classStudent = await student.getClasses();
      const classNames = classStudent.map((classObj) => classObj.name);
      console.log("class: ", classStudent);

      if (!student) {
        throw new Error(
          "Something went wrong please wait a minute and try again"
        );
      }
      return res.status(200).json(
        Response.successResponse({
          ...student.dataValues,
          classes: classNames,
        })
      );
    } catch (err) {
      console.log("catch err:", err);
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }

  static async createStudent(req, res, next) {
    try {
      console.log("body:", req.body);
      
      const newStudent = studentModel.build({
        fullName: req.body.fullName,
        address: req.body.address,
        dayOfBirth: new Date(req.body.dayOfBirth.slice(0, 10)),
        gender: req.body.gender,
        Email: req.body.Email,
      });
      //create student
      const studentReponse = await newStudent.save();
      //add student to class
      
      addStudentsToClassSemester(
        [studentReponse.idStudent],
        req.body.idClassSemester
      );
      return res.status(200).json(Response.successResponse("success"));
    } catch (err) {
      console.log("catch err:", err);
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }

  static async updateStudent(req, res, next) {
    try {
      const id = req.params.id;
      const student = await studentModel.findByPk(id);

      if (!student) {
        throw Error("Student not found");
      }
      student.set(req.body);
      const response = await student.save();
      return res.status(200).json(Response.successResponse(response));
    } catch (err) {
      console.log("catch err:", err);
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }
}

module.exports = studentController;
