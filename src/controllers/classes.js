const { query } = require("express");
const classModel = require("../models/class");
const teacherModel = require("../models/teacher");
const studentModel = require("../models/student")
const semesterModel = require("../models/semester");
const progressModel = require("../models/progress");
const Response = require("../utils/response");

class classController {
  static async getAllClasses(req, res, next) {
    try {
      console.log("get all classes");
      // const query = {
      //   where: {},
      // };
      // Check if each query parameter is present and add it to the query
      // if (req.query.MaLop) {
      //   query.where.MaLop = req.query.MaLop;
      // }
      // if (req.query.TenLop) {
      //   query.where.TenLop = req.query.TenLop;
      // }
      // if (req.query.SiSo) {
      //   query.where.SiSo = req.query.SiSo;
      // }
      const classes = await classModel.findAll();
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
      const class_ = await classModel.findByPk(req.params.id);
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
        name: req.body.className,
        number: req.body.number,
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
      let qry = {
        where: {},
      }
      qry.where.idClass = req.params.id
      const response = await classModel.destroy(qry);
      if(!response) throw "can't connect with database";
      return res.status(200).json(Response.successResponse(response));
    }
    catch(err){
      console.log("catch err:", err);
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }


  static async addStudentToClass(req, res, next){
    try{
      const classId = req.params.id;
      console.log("classId: " + classId);
      const listStudentId = req.body.studentListId;
      console.log("listStudentId: " + listStudentId);

      //find class
      const classInstance = await classModel.findByPk(classId);
      console.log("classInstance: " + classInstance)

      //find all students
      const students = await studentModel.findAll({
        where: { idStudent: listStudentId },
      });
      console.log("students: " + students)

     // create array of QuaTrinhHoc instances with HocSinhMaHS, LopMaLop, HOCKYMaHK, and GiaoVienMaGV fields
      const progressInstances = students.map((student) => {
        return {
          StudentIdStudent: student.idStudent,
          ClassIdClass: classInstance.idClass,
          SemesterIdSemester: 1,
          TeacherIdTeacher: 1,
        };
      });
      console.log("qth ", progressInstances);

      const result = await progressModel.bulkCreate(progressInstances);
      console.log("result ", result);
      res.json(result);
    }catch(err){
      res.json({
        "loi":err
      });

    }
  }
}

module.exports = classController;
