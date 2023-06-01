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
}
module.exports = parameterController;

