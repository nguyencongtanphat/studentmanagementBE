const Response = require("../utils/response");
const userModel = require("../models/user");

class userController {
  static async createUser(req, res, next) {}

  static async login(req, res, next) {
    try {
      const {username, password} = req.body;
      // console.log(userName, password);
      //check user name
      const user = await userModel.findOne({
        where:{
            userName: username,
            password: password
        }
      })
      if(!user)
         throw Error("User not found");
      return res.status(200).json(Response.successResponse(user))
    } catch (err) {
      return res.status(404).json(Response.errorResponse(404, err.message));
    }
  }
}
module.exports = userController;
