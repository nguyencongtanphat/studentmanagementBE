const parameterModel = require("../models/parameter");
const Response = require("../utils/response");

class parameterController {
  static async getParameters(req, res, next) {
    try {
      const queryName = req.query.name;
      const rule = await parameterModel.findOne({
        where: {
          name: queryName,
        },
      });
      return res.status(200).json(Response.successResponse(rule));
    } catch (err) {
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }
}
module.exports = parameterController;

