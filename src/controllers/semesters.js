const { query } = require("express");
const semesterModel = require("../models/semester");

const Response = require("../utils/response");

class semesterController {
  static async getAllSemesters(req, res, next) {
    try {
      const semesters = await semesterModel.findAll();
      if (!semesters) {
        throw "Something went wrong please wait a minute and try again";
      }
      return res.status(200).json(Response.successResponse(semesters));
    } catch (err) {
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }

  static async getSemesterById(req, res, next) {
    try {
      console.log('id of request id: ', req.params.id);
      const semester_ = await semesterModel.findByPk(req.params.id);
      if (!semester_) {
        throw new Error(
          "Something went wrong please wait a minute and try again"
        );
      }
      return res.status(200).json(Response.successResponse(semester_));
    } catch (err) {
      console.log("catch err:", err);
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }

  static async createSemester(req, res, next) {
    try {
      const newSemester = semesterModel.build({
        idSemester: req.body.idSemester,
        order: req.body.order,
        year: req.body.year,
      });
      const response = await newSemester.save();
      return res.status(200).json(Response.successResponse(response));
    } catch (err) {
      console.log("catch err:", err);
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }

  static async updateSemester(req, res, next) {
    try {
      const id = req.params.id;
      const semester_ = await semesterModel.findByPk(id);
      
      if (!semester_) {
        throw Error("Semester not found");
      }
      semester_.set(req.body)
      const response = await semester_.save();
      return res.status(200).json(Response.successResponse(response));
    } catch (err) {
      console.log("catch err:", err);
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }
  static async deleteSemesterById(req, res, next) {
    try{
      console.log(req);
      let qry = {
        where: {},
      }
      qry.where.idSemester = req.params.id
      console.log(qry);
      const response = await semesterModel.destroy(qry);
      if(!response) throw "can't connect with database";
      return res.status(200).json(Response.successResponse(response));
    }
    catch(err){
      console.log("catch err:", err);
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }

}

module.exports = semesterController;
