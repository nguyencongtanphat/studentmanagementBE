const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/databaseConn/sequelize");

class HocKy extends Model {}

HocKy.init(
  {
    HocKy: {
      type: DataTypes.String,
      require: true,
    },
    NamHoc: {
      type: DataTypes.SMALLINT,
      require: true,
    },
  },
  { sequelize, modelName: "HocKy" }
);

module.exports = HocKy;
