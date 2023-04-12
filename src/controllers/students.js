const studentModel = require("../models/hocsinh");
const Response = require("../utils/response");

class studentController {
  static async getAllStudents(req, res, next) {
    try {
      const students = await studentModel.findAll();
      if (!students) {
        throw "Something went wrong please wait a minute and try again";
      }
      return res.status(200).json(Response.successResponse(students));
    } catch (err) {
      return Response.handlingErrorResponse(err);
    }
  }

  static async getStudentById(req, res, next) {
    try {
      const id = req.params.id;
      const student = await studentModel.findByPk(id);
      if (!student) {
        throw "Something went wrong please wait a minute and try again";
      }
      return res.status(200).json(Response.successResponse(student));
    } catch (err) {
      return Response.handlingErrorResponse(err);
    }
  }
}

module.exports = studentController;
