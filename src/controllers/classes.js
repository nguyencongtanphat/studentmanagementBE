const { query } = require("express");
const classModel = require("../models/class");
const Response = require("../utils/response");
const sequelize = require("../utils/sequelize");
const { QueryTypes } = require("sequelize");

// const addStudentToClass = async (classId, listStudentId, semesterId) => {
//   try {
//     // create array of QuaTrinhHoc instances with HocSinhMaHS, LopMaLop, HOCKYMaHK, and GiaoVienMaGV fields
//     const progressInstances = listStudentId.map((studentId) => {
//       return {
//         StudentIdStudent: studentId,
//         ClassIdClass: classId,
//         SemesterIdSemester: semesterId,
//         TeacherIdTeacher: teacherId,
//       };
//     });

//     const result = await progressModel.bulkCreate(progressInstances);
//     if (result.length === progressInstances.length) return "success";
//     else return "fail";
//   } catch (err) {
//     console.log("err while creating progress add student to class");
//     throw Error(err);
//   }
// };

class classController {
  //done
  static async getAllClassesList(req, res, next) {
    try {
      const classes = await sequelize.query(
        `SELECT class.*, grade.name as gradeName
        FROM class, grade
        WHERE class.idGrade = grade.idGrade
        `,
        { type: QueryTypes.SELECT }
      );
      console.log("class:", classes);
      return res.status(200).json(Response.successResponse(classes));
    } catch (err) {
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }

  static async getClassById(req, res, next) {
    try {
      const idClass = req.params.id;
      console.log("id Class: ", idClass);
      const classes = await sequelize.query(
        `SELECT *
        FROM class 
        WHERE idClass = ${idClass}
        `,
        { type: QueryTypes.SELECT }
      );
      console.log("class:", classes);
      return res.status(200).json(Response.successResponse(classes[0]));
    } catch (err) {
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }

  static async createNewClass(req, res, next) {
    try {
      const { className, idGrade } = req.body;
      //check is classname already exists
      const classdb = await sequelize.query(
        `SELECT *
        FROM class 
        WHERE name = "${className}"
        `,
        { type: QueryTypes.SELECT }
      );

      if (classdb.length > 0) {
        throw new Error("class name already exists");
      }

      const response = await sequelize.query(
        `INSERT INTO class (idClass, name, idGrade ) VALUES(NULL, "${className}", ${idGrade});`,
        { type: QueryTypes.INSERT }
      );
      return res.status(200).json(Response.successResponse(response[0]));
    } catch (err) {
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }

  static async deleteClassById(req, res, next) {
    try {
      const idClass = req.params.id;
      console.log("id Class: ", idClass);
      const response = await sequelize.query(
        `DELETE
        FROM class 
        WHERE idClass = ${idClass}
        `,
        { type: QueryTypes.DELETE }
      );
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
      class_.set(req.body);
      const response = await class_.save();
      return res.status(200).json(Response.successResponse(response));
    } catch (err) {
      console.log("catch err:", err);
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }

}

module.exports =  classController ;
