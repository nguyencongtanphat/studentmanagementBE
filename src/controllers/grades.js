const { query } = require("express");
const gradeModel = require("../models/grade");

const Response = require("../utils/response");

class gradeController {
  static async getAllGrades(req, res, next) {
    try {
      const grades = await gradeModel.findAll();
      if (!grades) {
        throw "Something went wrong please wait a minute and try again";
      }
      return res.status(200).json(Response.successResponse(grades));
    } catch (err) {
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }

  static async getGradeById(req, res, next) {
    try {
      console.log('id of request id: ', req.params.id);
      const grade_ = await gradeModel.findByPk(req.params.id);
      if (!grade_) {
        throw new Error(
          "Grade does not exist"
        );
      }
      return res.status(200).json(Response.successResponse(grade_));
    } catch (err) {
      console.log("catch err:", err);
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }

}
module.exports = gradeController;
