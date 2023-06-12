const subjectModel = require("../models/subject");
const subjectteacherModel = require("../models/subjectteacher")
const sequelize = require("../utils/sequelize");
const { query } = require("express");
const { QueryTypes } = require("sequelize");
const Response = require("../utils/response");

class subjectController {
  static async getAllSubjects(req, res, next) {
    try {
      let subjects = await subjectModel.findAll();
      if (!subjects) {
        throw "Something went wrong please wait a minute and try again";
      }
     let newSubjects = [];
     for (let i = 0; i < subjects.length; i++) {
       //find the class of a student
       const teachers = await sequelize.query(
         `SELECT teacher.fullName
            FROM subjectteacher, teacher 
            WHERE subjectteacher.idTeacher = teacher.idTeacher
            AND subjectteacher.idSubject = ${subjects[i].idSubject}
        `,
         { type: QueryTypes.SELECT }
       );
       const teachersName = teachers.map((teacher) => teacher.fullName);
       newSubjects.push({ ...subjects[i]["dataValues"], teachersName });
     }
     subjects = newSubjects;
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
      const {name, teachers} = req.body;

      //check name subject is exist
      const subjectDb = await subjectModel.findOne({
        where:{
          name:name
        }
      })
      if(subjectDb){
        throw new Error("Subject is already exist")
      }
      
      const newSubject = subjectModel.build({
        name: name,
      });
      const response = await newSubject.save();

      //create subject teacher
      for(let i = 0; i<teachers.length;i++){
        await subjectteacherModel.create({
          idTeacher: teachers[i],
          idSubject:response.idSubject,
        });
      }
      return res.status(200).json(Response.successResponse("success"));
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
      if(!response) throw new Error("delete failed");
      return res.status(200).json(Response.successResponse(response));
    }
    catch(err){
      console.log("catch err:", err);
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }

}

module.exports = subjectController;
