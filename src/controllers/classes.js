const { query } = require("express");
const classModel = require("../models/lop");
const teacherModel = require("../models/giaovien");
const studentModel = require("../models/hocsinh")
const semesterModel = require("../models/hocky");
const quaTrinhHocModel = require("../models/quatrinhhoc");
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


  static async addStudentToClass(req, res, next){
    try{
      const classId = req.params.id;
      const listStudentId = req.body.studentListId;

      //find class
      const classInstance = await classModel.findByPk(classId);

      //find all students
      const students = await studentModel.findAll({
        where: { MaHS: listStudentId },
      });

     // classInstance.addHocSinh(students);
     
     // create array of QuaTrinhHoc instances with HocSinhMaHS, LopMaLop, HOCKYMaHK, and GiaoVienMaGV fields
      const quatrinhHocInstances = students.map((student) => {
        return {
          HocSinhMaHS: student.MaHS,
          LopMaLop: classInstance.MaLop,
          HOCKYMaHK: 1,
          GiaoVienMaGV: 1,
        };
      });
      console.log("qth ", quatrinhHocInstances);

      // quatrinhHocInstances.forEach(async(item)=>  )
      //bulk create QuaTrinhHoc instances
      const result = await quaTrinhHocModel.bulkCreate(quatrinhHocInstances);

      //classInstance.addHocSinh(students);
      // await Promise.all(
      //   students.map((st) =>
      //     quaTrinhHocModel.create({
      //       LopMaLop: classId,
      //       HocSinhMaHS: st.MaHS,
      //       HOCKYMaHK: 1,
      //       GiaoVienMaGV: 1, // bạn có thể cập nhật sau khi biết giáo viên phụ trách
      //       DiemTBHK: null, // bạn có thể cập nhật sau khi biết kết quả học tập
      //     })
      //   )
      // );

      // //find the teacher
      // const teacher = await teacherModel.findByPk(1)

      // const semester = await semesterModel.findByPk(1);
      // console.log("semester", semester)
      // classInstance.addHOCKY(semester);

      res.json(result);
    }catch(err){
      res.json({
        "loi":err
      });

    }
  }
}

module.exports = classController;
