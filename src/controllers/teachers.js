const teacherModel = require("../models/teacher");
const Response = require("../utils/response");
const { Op } = require("sequelize");

class teacherController {
  static async getAllTeachers(req, res, next) {
    try {
      const teachers = await teacherModel.findAll();
      if (!teachers) {
        throw "Something went wrong please wait a minute and try again";
      }
      return res.status(200).json(Response.successResponse(teachers));
    } catch (err) {
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }
  static async getTeacherById(req, res, next) {
    try {
      let teacher = await teacherModel.findByPk(req.params.id);
      if (!teacher) {
        throw "Something went wrong please wait a minute and try again";
      }
      return res.status(200).json(Response.successResponse(teacher));
    } catch (err) {
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }
  static async createTeacher(req, res, next) {
    try {
      let newTeacher = teacherModel.build({
        fullName: req.body.fullName,
        address: req.body.address,
        dayOfBirth: req.body.dayOfBirth,
        gender: req.body.gender,
        email: req.body.Email,
        startedDay: req.body.startedDay,
      });
      let response = await newTeacher.save();
      return res.status(200).json(Response.successResponse(response));
    } catch (err) {
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }
  static async updateTeacher(req, res, next) {
    try {
      const id = req.params.id;
      const teacher_ = await teacherModel.findByPk(id);

      if (!teacher_) {
        throw Error("Teacher not found");
      }
      teacher_.set(req.body);
      const response = await teacher_.save();
      return res.status(200).json(Response.successResponse(response));
    } catch (err) {
      console.log("catch err:", err);
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }
  static async deleteTeacherById(req, res, next) {
    try {
     
      const response = await teacherModel.destroy({ 
        where: { idTeacher: req.params.id } 
      }); 
      if (!response) throw "delete failed";
      return res.status(200).json(Response.successResponse(response));
    } catch (err) {
      console.log("catch err:", err);
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }
}

module.exports = teacherController;
