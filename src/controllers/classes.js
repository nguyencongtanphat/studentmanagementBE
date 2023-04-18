const { query } = require("express");
const classModel = require("../models/lop");
const Response = require("../utils/response");

class classController {
  static async getAllClasses(req, res, next) {
    try {
      const query = {
        where: {},
      };
      // Check if each query parameter is present and add it to the query
      if (req.query.MaLop) {
        query.where.MaLop = req.query.MaLop;
      }
      if (req.query.TenLop) {
        query.where.TenLop = req.query.TenLop;
      }
      if (req.query.SiSo) {
        query.where.SiSo = req.query.SiSo;
      }
      const classes = await classModel.findAll(query);
      if (!classes) {
        throw "connection lost";
      }
      return res.status(200).json(Response.successResponse(classes));
    } catch (err) {
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }

  static async getClassById(req, res, next) {
    try {
      const id = req.params.id;
      const class_ = await classModel.findByPk(id);
      if (!class_) {
        throw new Error(
          "Something went wrong"
        );
      }
      return res.status(200).json(Response.successResponse(class_));
    } catch (err) {
      console.log("catch err:", err);
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }

  static async createClass(req, res, next) {
    try {
      const newClass = classModel.build({
        MaLop: req.body.MaLop,
        TenLop: req.body.TenLop,
        SiSo: req.body.SiSo,
      });
      const response = await newClass.save();
      return res.status(200).json(Response.successResponse(response));
    } catch (err) {
      console.log("catch err:", err);
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }

  static async updateClass(req, res, next) {
    try {
      const id = req.params.id;
      const class_ = await classModel.findByPk(id);
      
      if (!class_) {
        throw Error("Class not found");
      }
      class_.set(req.body)
      const response = await class_.save();
      return res.status(200).json(Response.successResponse(response));
    } catch (err) {
      console.log("catch err:", err);
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }
  static async deleteClassById(req, res, next) {
    try{
      query = {
        where: {},
      }
      query.where.MaLop = req.query.id
      const response = await classModel.drop(query);
      if(!response) throw "can't connect with database";
      return res.status(200).json(Response.successResponse(response));
    }
    catch(err){
      console.log("catch err:", err);
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }
}

module.exports = classController;
