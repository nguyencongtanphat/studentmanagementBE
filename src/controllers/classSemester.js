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
      // const response = await classSemesterModel.findAll();

      const response = await sequelize.query(
        `SELECT cs.*, c.*, s.*, 
          t.fullName as teacherName, 
          t.idTeacher, 
          CONCAT(s.order, '-', s.year) AS semester
        FROM classsemester cs, class c, semester s, teacher t
        WHERE cs.idClass = c.idClass
        And cs.idSemester = s.idSemester
        And t.idTeacher = cs.idTeacher
        `,
        { type: QueryTypes.SELECT }
      );
      return res.status(200).json(Response.successResponse(response));
    } catch (e) {
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }
  static async getClassesSemesterById(req, res, next) {
    try {
      const id = req.params.id;
      let response = {};
      const classInfo = await sequelize.query(
        `SELECT cs.*, c.name as className, c.idClass, s.*, 
          t.fullName as teacherName, 
          t.idTeacher, 
          CONCAT(s.order, '-', s.year) AS semester
        FROM classsemester cs, class c, semester s, teacher t
        WHERE cs.idClass = c.idClass
        And cs.idSemester = s.idSemester
        And t.idTeacher = cs.idTeacher
        And cs.idClassSemester = ${id}
        `,
        { type: QueryTypes.SELECT }
      );

      if (!classInfo) throw new Error("class is not found");
      response.classInfo = classInfo[0];
      //query student
      const studentsList = await sequelize.query(
        `
        SELECT *
        FROM studentprogress sp, student s
        WHERE sp.idClassSemester = ${id}
        And sp.idStudent = s.idStudent
        `,
        { type: QueryTypes.SELECT }
      );
      response.studentsList = studentsList;
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

  static async updateClassesSemester(req, res, next) {
    try {
      const idClassSemester = req.params.id;
      const classSemesterdb = await classSemesterModel.findByPk(
        idClassSemester
      );
      //update classSemester
      classSemesterdb.update(req.body)
      //delete 
      await studentProgressModel.destroy({
        where: {
          idClassSemester: idClassSemester,
        },
      });
      //add student
      await addStudentsToClassSemester(
        req.body.listIdStudent,
        idClassSemester
      );
      console.log("body data: ", req.body);
      return res.status(200).json(Response.successResponse("success"));
      // await classSemesterdb.update(req.body)
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
      console.log("delete students from:", idClassSemester, idStudent);
      //check class semesters is exist
      const classSemesterBb = await classSemesterModel.findOne({
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
module.exports = { classSemesterController, addStudentsToClassSemester };
