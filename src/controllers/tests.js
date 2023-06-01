const { query } = require("express");
const testModel = require("../models/test");

const Response = require("../utils/response");

class testController {
  static async getAllTest(req, res, next) {
    try {
      const tests = await testModel.findAll();
      if (!tests) {
        throw "Something went wrong please wait a minute and try again";
      }
      return res.status(200).json(Response.successResponse(tests));
    } catch (err) {
      return res.status(404).json(Respone.errorResponse(404, err.message));
    }
  }

  static async getTestById(req, res, next) {
    try {
      const test_ = await testModel.findByPk(req.params.id);
      if (!test_) {
        throw "Something went wrong please wait a minute and try again";
      }
      return res.status(200).json(Response.successResponse(test_));
    } catch (err) {
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }
  static async updateTest(req, res, next) {
    try {
      const test_ = await testModel.findByPk(req.params.id);
      if (!test_) throw "Test not found";
      test_.set(req.body);
      const response = await test_.save();
      if (!response)
        throw "Something went wrong please wait a minute and try again";
      return res.status(200).json(Response.successResponse(Response));
    } catch (err) {
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }
  // static async createTest(req, res, next){
  //     try{
  //         const newTest = testModel.build({
  //             idTest: req.body.idTest,
  //             testName: req.body.testName,
  //             coefficent: req.body.coefficent
  //         });
  //         const response = await newTest.save();
  //         if(!response) throw "Something went wrong please wait a minute and try again"
  //         return res.status(200).json(Response.successResponse(response));
  //     }
  //     catch(err){
  //         return res.status(404).json(Response.errorResponse(404, err.message));
  //     }
  // }

//   static async deleteTest(req, res, next) {
//     try {
//       const response = await testModel.destroy({
//         where: { idTest: req.params.id },
//       });
//       if (!response)
//         throw "Something when wrong please wait a minute and try again";
//       return res.status(200).json(Response.successResponse(response));
//     } catch (err) {
//       return res.status(404).json(Response.errorResponse(404, err.message));
//     }
//   }
}

module.exports = testController;