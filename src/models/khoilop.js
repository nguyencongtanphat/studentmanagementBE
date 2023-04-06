const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/databaseConn/sequelize");

class KhoiLop extends Model {}

KhoiLop.init(
  {
    Khoi: {
      type: DataTypes.SMALLINT,
      require: true,
    },
  },
  { sequelize, modelName: "KhoiLop" }
);

module.exports = KhoiLop;
