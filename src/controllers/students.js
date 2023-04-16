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
        return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }

  static async getStudentById(req, res, next) {
    try {
      const id = req.params.id;
      const student = await studentModel.findByPk(id);
      console.log("student info found", student)
      if (!student) {
        console.log("get no student")
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
}

module.exports = studentController;
