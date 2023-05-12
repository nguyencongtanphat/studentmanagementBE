const { query } = require("express");
const classModel = require("../models/class");
const teacherModel = require("../models/teacher");
const studentModel = require("../models/student");
const semesterModel = require("../models/semester");
const progressModel = require("../models/progress");
const Response = require("../utils/response");
const sequelize = require("../utils/sequelize");
const { QueryTypes } = require("sequelize");

const addStudentToClass = async (
  classId,
  listStudentId,
  semesterId,
  teacherId
) => {
  try {
    // create array of QuaTrinhHoc instances with HocSinhMaHS, LopMaLop, HOCKYMaHK, and GiaoVienMaGV fields
    const progressInstances = listStudentId.map((studentId) => {
      return {
        StudentIdStudent: studentId,
        ClassIdClass: classId,
        SemesterIdSemester: semesterId,
        TeacherIdTeacher: teacherId,
      };
    });

    const result = await progressModel.bulkCreate(progressInstances);
    if (result.length === progressInstances.length) return "success";
    else return "fail";
  } catch (err) {
    console.log("err while creating progress add student to class");
    throw Error(err);
  }
};

class classController {
  static async getAllClasses(req, res, next) {
    try {
      const conditionIdSemester = req.query.semesterId
        ? `and s.idSemester=${req.query.semesterId}`
        : "";
      const classes = await sequelize.query(
        `SELECT DISTINCT c.idClass, c.name
        FROM class c, progress p, semester s
        WHERE c.idClass = p.ClassIdClass
          and s.idSemester = p.SemesterIdSemester
          ${conditionIdSemester}`,
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
      const class_ = await classModel.findByPk(req.params.id);
      if (!class_) {
        throw new Error("Something went wrong");
      }
      return res.status(200).json(Response.successResponse(class_));
    } catch (err) {
      console.log("catch err:", err);
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }

  static async createClass(req, res, next) {
    try {
      const { className, teacherId, semesterId, idStudentList } = req.body;
      //check class is already exists
      const classCheck = await classModel.findOne({
        where: {
          name: className,
        },
        include: [
          {
            model: semesterModel,
            where: {
              idSemester: semesterId,
            },
            through: {
              model: progressModel,
              attributes: [],
            },
          },
        ],
      });

      console.log("class check:", classCheck);
      if (classCheck) {
        throw new Error("class is existing");
      } else {
        //create class
        const newClass = classModel.build({
          name: className,
          number: idStudentList.length,
        });
        const responseNewClass = await newClass.save();
        //add student to class
        const result = await addStudentToClass(
          responseNewClass.idClass,
          idStudentList,
          semesterId,
          teacherId
        );
        console.log("result:", result);
        return res.status(200).json(Response.successResponse(result));
      }
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
  static async deleteClassById(req, res, next) {
    try {
      let qry = {
        where: {},
      };
      qry.where.idClass = req.params.id;
      const response = await classModel.destroy(qry);
      if (!response) throw "can't connect with database";
      return res.status(200).json(Response.successResponse(response));
    } catch (err) {
      console.log("catch err:", err);
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }

  static async addStudentToClassApi(req, res, next) {
    try {
      const { classId, listStudentId, idSemester, teacherId } = req.body;
      //find teacher id through classId
      const result = await addStudentToClass(
        classId,
        listStudentId,
        idSemester,
        teacherId
      );
      console.log("result ", result);
      return res.status(200).json(Response.successResponse(result));
    } catch (err) {
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }
}

module.exports = { addStudentToClass, classController };

