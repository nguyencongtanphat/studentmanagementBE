const { query } = require("express");
const Response = require("../utils/response");
const sequelize = require("../utils/sequelize");
const { QueryTypes } = require("sequelize");
const classSemesterModel = require("../models/classsemester");
const studentProgressModel = require("../models/studentprogress");

const addStudentsToClassSemester = async (listIdStudent, idClassSemester) => {
  try {
    for (let i = 0; i < listIdStudent.length; i++) {
      await studentProgressModel.create({
        idStudent: listIdStudent[i],
        idClassSemester: idClassSemester,
        avgSemester: 0,
      });
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

class classSemesterController {
  static async getAllClassesSemester(req, res, next) {
    try {
      const response = await classSemesterModel.findAll();
      return res.status(200).json(Response.successResponse(response));
    } catch (e) {
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }
  static async getClassesSemesterById(req, res, next) {
    try {
      const id = req.params.id;
      const classSemester = await classSemesterModel.findByPk(id);
      if (!classSemester) throw new Error("class is not found");
      return res.status(200).json(Response.successResponse(response));
    } catch (err) {
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }

  static async createClassesSemester(req, res, next) {
    try {
      console.log(req.body);
      const { idClass, idSemester, idTeacher, number, listIdStudent } =
        req.body;

      //check is existing
      const classSemesterDb = await classSemesterModel.findOne({
        where: {
          idClass: idClass,
          idSemester: idSemester,
        },
      });

      if (classSemesterDb) {
        throw new Error("class is existing in this semester");
      }
      const newClassSemester = await classSemesterModel.create({
        idClass,
        idSemester,
        idTeacher,
        number,
      });
      await addStudentsToClassSemester(
        listIdStudent,
        newClassSemester.idClassSemester
      );
      return res.status(200).json(Response.successResponse("success"));
    } catch (err) {
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }

  static async addStudentsToClassSemester(req, res, next) {
    try {
      const idClassSemester = req.params.id;
      //check is classSemester exists
      const classSemesterdb = await classSemesterModel.findByPk(
        idClassSemester
      );
      if (!classSemesterdb)
        throw new Error("class is not found in this semester database");

      const { listIdStudent } = req.body;
      await addStudentsToClassSemester(listIdStudent, idClassSemester);
      return res.status(200).json(Response.successResponse("success"));
    } catch (err) {
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }

  static async deleteStudentsFromClassSemester(req, res, next) {
    try {
      const idClassSemester = req.params.id;
      const idStudent = req.body.idStudent;
      console.log("delete students from:", idClassSemester, idStudent)
      //check class semesters is exist
      const classSemesterBb =await classSemesterModel.findOne({
        where: {
          idClassSemester: idClassSemester,
        },
      });
    
      if (!classSemesterBb) throw new Error("class is not found");

      const response = studentProgressModel.destroy({
        where: {
          idStudent: idStudent,
          idClassSemester: idClassSemester,
        },
      });
      return res.status(200).json(Response.successResponse(response));
    } catch (err) {
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }
}
module.exports = classSemesterController;
