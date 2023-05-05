const studentModel = require("../models/student");
const semesterModel = require("../models/semester");
const parameterModel = require("../models/parameter");
const Response = require("../utils/response");
const Class = require("../models/class");
const { QueryTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");


class studentController {
  static async getAllStudents(req, res, next) {
    try {
    
      //const students = await studentModel.findAll(query);
      const students = await sequelize.query(
        `SELECT * FROM student s, progress p, class c
        where s.idStudent = p.StudentIdStudent
        and p.ClassIdClass = c.idClass
        `
      )
      if (!students) {
        throw "Something went wrong please wait a minute and try again";
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
      const classStudent =await student.getClasses();
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
      const newStudent = studentModel.build({
        fullName: req.body.fullName,
        address: req.body.address,
        dayOfBirth: req.body.dayOfBirth,
        gender: req.body.gender,
        Email: req.body.Email,
      });
      const response = await newStudent.save();
      return res.status(200).json(Response.successResponse(response));
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
      student.set(req.body)
      const response = await student.save();
      return res.status(200).json(Response.successResponse(response));
    } catch (err) {
      console.log("catch err:", err);
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }
}

module.exports = studentController;
