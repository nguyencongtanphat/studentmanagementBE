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
          "Something went wrong please wait a minute and try again"
        );
      }
      return res.status(200).json(Response.successResponse(grade_));
    } catch (err) {
      console.log("catch err:", err);
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }

  static async createGrade(req, res, next) {
    try {
      const newGrade = gradeModel.build({
        idGrade: req.body.idGrade,
        name: req.body.name,
      });
      const response = await newGrade.save();
      return res.status(200).json(Response.successResponse(response));
    } catch (err) {
      console.log("catch err:", err);
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }

  static async updateGrade(req, res, next) {
    try {
      const id = req.params.id;
      const grade_ = await gradeModel.findByPk(id);
      
      if (!grade_) {
        throw Error("Grade not found");
      }
      grade_.set(req.body)
      const response = await grade_.save();
      return res.status(200).json(Response.successResponse(response));
    } catch (err) {
      console.log("catch err:", err);
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }
  static async deleteGradeById(req, res, next) {
    try{
      console.log(req);
      let qry = {
        where: {},
      }
      qry.where.idGrade = req.params.id
      console.log(qry);
      const response = await gradeModel.destroy(qry);
      if(!response) throw "can't connect with database";
      return res.status(200).json(Response.successResponse(response));
    }
    catch(err){
      console.log("catch err:", err);
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }

}

module.exports = gradeController;
