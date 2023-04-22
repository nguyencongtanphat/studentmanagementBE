const studentModel = require("../models/student");
const Response = require("../utils/response");

class studentController {
  static async getAllStudents(req, res, next) {
    try {
      const query = {
        where: {},
      };
      // Check if each query parameter is present and add it to the query
      if (req.query.fullName) {
        query.where.fullName = req.query.fullName;
      }
      if (req.query.address) {
        query.where.address = req.query.address;
      }
      if (req.query.dayOfBirth) {
        query.where.dayOfBirth = req.query.dayOfBirth;
      }
      if (req.query.gender) {
        query.where.gender = req.query.gender;
      }
      if (req.query.Email) {
        query.where.Email = req.query.Email;
      }

      const students = await studentModel.findAll(query);
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
      const student = await studentModel.findByPk(id);
      if (!student) {
        throw new Error(
          "Something went wrong please wait a minute and try again"
        );
      }
      return res.status(200).json(Response.successResponse(student));
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
