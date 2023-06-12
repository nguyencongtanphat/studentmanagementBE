const parameterModel = require("../models/parameter");
const Response = require("../utils/response");

class parameterController {
  
  static async getParameters(req, res, next) {
    try {
       
      const query ={}

      if(req.query.name){
        query.name = req.query.name;
      }

      const rules = await parameterModel.findAll({
        where: query,
      });
      if (!rules) {
        throw new Error("rules not found")
      }
      return res.status(200).json(Response.successResponse(rules));
    } catch (err) {
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }
  static async updateParameter(req, res, next) {
    try {
      console.log("updating parameter", req.body);
      parameterModel.update({"value": req.body["minage"]}, {where: {"name": "minimum age"}});
      parameterModel.update({"value": req.body["maxage"]}, {where: {"name": "maximum age"}});
      parameterModel.update({"value": req.body["maxquan"]}, {where: {"name": "maximum quantity"}});
      parameterModel.update({"value": req.body["subjectpassingscore"]}, {where: {"name": "subject passing score"}});
      parameterModel.update({"value": req.body["passingscore"]}, {where: {"name": "passing score"}});
      parameterModel.update({"value": req.body["minscore"]}, {where: {"name": "minimum score"}});
      parameterModel.update({"value": req.body["maxscore"]}, {where: {"name": "maximum score"}});
      console.log("body data: ", req.body);
      return res.status(200).json(Response.successResponse("success"));
      // await classSemesterdb.update(req.body)
    } catch (err) {
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }
}
module.exports = parameterController;

