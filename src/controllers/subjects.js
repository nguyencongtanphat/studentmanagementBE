const { query } = require("express");
const subjectModel = require("../models/subject");

const Response = require("../utils/response");

class subjectController {
  static async getAllSubjects(req, res, next) {
    try {
      const subjects = await subjectModel.findAll();
      if (!subjects) {
        throw "Something went wrong please wait a minute and try again";
      }
      return res.status(200).json(Response.successResponse(subjects));
    } catch (err) {
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }

  static async getSubjectById(req, res, next) {
    try {
      console.log('id of request id: ', req.params.id);
      const subject_ = await subjectModel.findByPk(req.params.id);
      if (!subject_) {
        throw new Error(
          "Subject not exist"
        );
      }
      return res.status(200).json(Response.successResponse(subject_));
    } catch (err) {
      console.log("catch err:", err);
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }

  static async createSubject(req, res, next) {
    try {
      const {name, idTeacher} = req.body;

      //check name subject is exist
      const subjectDb = await subjectModel.findOne({
        where:{
          name:name
        }
      })

      
      const newSubject = subjectModel.build({
        idSubject: req.body.idSubject,
        name: req.body.name,
        coefficent: req.body.coefficent,
      });
      const response = await newSubject.save();
      return res.status(200).json(Response.successResponse(response));
    } catch (err) {
      console.log("catch err:", err);
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }

  static async updateSubject(req, res, next) {
    try {
      const id = req.params.id;
      const subject_ = await subjectModel.findByPk(id);
      
      if (!subject_) {
        throw Error("Subject not found");
      }
      subject_.set(req.body)
      const response = await subject_.save();
      return res.status(200).json(Response.successResponse(response));
    } catch (err) {
      console.log("catch err:", err);
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }
  static async deleteSubjectById(req, res, next) {
    try{
      console.log(req);
      let qry = {
        where: {},
      }
      qry.where.idSubject = req.params.id
      console.log(qry);
      const response = await subjectModel.destroy(qry);
      if(!response) throw "can't connect with database";
      return res.status(200).json(Response.successResponse(response));
    }
    catch(err){
      console.log("catch err:", err);
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }

}

module.exports = subjectController;
