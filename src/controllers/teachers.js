const teacherModel = require("../models/teacher");
const subjectteacherModel = require("../models/subjectteacher");
const UserModel = require("../models/user");
const Response = require("../utils/response");
const { Op } = require("sequelize");
const sequelize = require("../utils/sequelize");
const { query } = require("express");
const { QueryTypes } = require("sequelize");

class teacherController {
  static async getAllTeachers(req, res, next) {
    try {
      let teachers = await teacherModel.findAll();
      if (!teachers) {
        throw "Don't have any teacher";
      }
      let newTeachers = [];
      for (let i = 0; i < teachers.length; i++) {
        //find the class of a student
        const subjects = await sequelize.query(
          `SELECT subject.name
            FROM subjectteacher, subject 
            WHERE subjectteacher.idSubject = subject.idSubject
            AND subjectteacher.idTeacher = ${teachers[i].idTeacher}
        `,
          { type: QueryTypes.SELECT }
        );
        const subjectName = subjects.map((subject) => subject.name);
        newTeachers.push({ ...teachers[i]["dataValues"], subjectName });
      }
      teachers = newTeachers;

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
      const subjects = await sequelize.query(
        `SELECT subject.name
            FROM subjectteacher, subject 
            WHERE subjectteacher.idSubject = subject.idSubject
            AND subjectteacher.idTeacher = ${teacher.idTeacher}
        `,
        { type: QueryTypes.SELECT }
      );
      const subjectsName = subjects.map(subject =>subject.name)
      return res.status(200).json(
        Response.successResponse({
          ...teacher.dataValues,
          subjects: subjectsName,
        })
      );
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
      let newTeacherRes = await newTeacher.save();
      const subjects = req.body.Subjects;
      console.log("subjects", subjects);
      for(let i = 0; i < subjects.length; i++){
        await subjectteacherModel.create({
          idSubject: subjects[i],
          idTeacher: newTeacherRes.idTeacher,
        });
      }
      //create user
      await UserModel.create({
        userName: req.body.userName,
        password: req.body.password,
        role: "Teacher",
        idTeacher: newTeacherRes.idTeacher,
      });
      return res.status(200).json(Response.successResponse("success"));
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
        where: { idTeacher: req.params.id },
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
