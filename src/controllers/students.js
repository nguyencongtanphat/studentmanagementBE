const studentModel = require("../models/student");
const classSemesterModel = require("../models/classsemester")
const semesterModel = require("../models/semester");
const parameterModel = require("../models/parameter");
const progressModel = require("../models/studentprogress");
const Response = require("../utils/response");
const Class = require("../models/class");
const { QueryTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");
const { addStudentsToClassSemester } = require("./classSemester");

class studentController {
  static async getAllStudents(req, res, next) {
    try {
      const isGetClass = req.query.isGetClass;
      let students = await studentModel.findAll();
      if (!students) {
        throw "student is empty";
      }
      if (isGetClass) {
        let newStudents = [];
        for (let i = 0; i < students.length; i++) {
          //find the class of a student
          const classes = await sequelize.query(
            `SELECT c.name
            FROM student s, studentprogress sp, classsemester cs, class c
            WHERE s.idStudent = sp.idStudent
            AND sp.idClassSemester = cs.idClassSemester
            AND cs.idClass = c.idClass
            AND s.idStudent = ${students[i].idStudent}
        `,
            { type: QueryTypes.SELECT }
          );
          const classNames = classes.map((classObj) => classObj.name);
          newStudents.push({ ...students[i]["dataValues"], classNames });
        }
        students = newStudents;
      }
      return res.status(200).json(Response.successResponse(students));
    } catch (err) {
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }

  

  static async getStudentById(req, res, next) {
    try {
      const id = req.params.id;
      let classes = [];
      const year = req.query.year;
      const order = req.query.order;
      console.log(year, order, 'fgsdfgsd');
      //find the student
      const student = await studentModel.findByPk(id);
        if (!year && !order) {
          //find all the class students learn
          classes = await sequelize.query(
            `SELECT c.name
            FROM student s, studentprogress sp, classsemester cs, class c, semester sem
            WHERE s.idStudent = sp.idStudent
            AND sp.idClassSemester = cs.idClassSemester
            AND cs.idClass = c.idClass
            AND s.idStudent = ${id}
        `,
            { type: QueryTypes.SELECT }
          );
      }
      else {
        classes = await sequelize.query(
          `SELECT c.name
          FROM student s, studentprogress sp, classsemester cs, class c, semester sem
          WHERE s.idStudent = sp.idStudent
          AND sp.idClassSemester = cs.idClassSemester
          AND cs.idClass = c.idClass
          AND cs.idSemester = sem.idSemester
          AND s.idStudent = ${id} and sem.year = ${year} and sem.order = ${order}
      `,
          { type: QueryTypes.SELECT }
        );
      }

      const classNames = classes.map((classObj) => classObj.name);
      console.log("class: ", classNames);

      if (!student) {
        throw new Error(
          "Something went wrong please wait a minute and try again"
        );
      }
      return res.status(200).json(
        Response.successResponse({
          ...student.dataValues,
          classes: classNames,
        })
      );
    } catch (err) {
      console.log("catch err:", err);
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  };

  static async getStudentProgresses(req,res,next) {
    try {
      const year = req.query.year;
      const order = req.query.order;
      const idClass = req.query.idClass;
      const progresses = await sequelize.query(`
        select prog.idStudentProgress, prog.idStudent
        from semester inner join classsemester as clasem on semester.idSemester = clasem.idSemester
        inner join class on class.idClass = clasem.idClass
        inner join studentprogress as prog on prog.idClassSemester = clasem.idClassSemester
        where semester.year = ${year} and semester.order = ${order} and class.idClass = ${idClass};
      `, { type: QueryTypes.SELECT }
      );
      console.log(progresses);
      return res.status(200).json(Response.successResponse(progresses));
    } catch (e) {
      return res.status(404).json(Response.errorResponse(404, e.message));
    }
  };

  static async getStudentInClass(req,res,next) {
    try {
      const year = req.query.year;
      const order = req.query.order;
      const idClass = req.query.idClass;
      const progresses = await sequelize.query(`
        select student.idStudent, student.fullName
        from semester inner join classsemester as clasem on semester.idSemester = clasem.idSemester
        inner join class on class.idClass = clasem.idClass
        inner join studentprogress as prog on prog.idClassSemester = clasem.idClassSemester
        inner join student on prog.idStudent = student.idStudent
        where semester.year = ${year} and semester.order = ${order} and class.idClass = ${idClass};
      `, { type: QueryTypes.SELECT }
      );
      console.log(progresses);
      return res.status(200).json(Response.successResponse(progresses));
    } catch (e) {
      return res.status(404).json(Response.errorResponse(404, e.message));
    }
  }

  static async createStudent(req, res, next) {
    try {
      console.log("body:", req.body);
      const newStudent = studentModel.build({
        fullName: req.body.fullName,
        address: req.body.address,
        dayOfBirth: new Date(req.body.dayOfBirth.slice(0, 10)),
        gender: req.body.gender,
        Email: req.body.Email,
      });
      //create student
      const studentReponse = await newStudent.save();
     
      //add student to class

      await addStudentsToClassSemester(
        [studentReponse.idStudent],
        req.body.idClassSemester
      );
      return res.status(200).json(Response.successResponse("success"));
    } catch (err) {
      console.log("catch err:", err);
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }

  static async updateStudent(req, res, next) {
    try {
      const id = req.params.id;
      const student = await studentModel.findByPk(id);

      if (!student) {
        throw Error("Student not found");
      }
      student.set(req.body);
      const response = await student.save();
      return res.status(200).json(Response.successResponse(response));
    } catch (err) {
      console.log("catch err:", err);
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }
}

module.exports = studentController;
