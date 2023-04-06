const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/databaseConn/sequelize");

class Lop extends Model {}

Lop.init(
  {
    TenLop: {
      type: DataTypes.STRING,
      require: true,
    },
    SiSo: {
      type: DataTypes.INTEGER,
      require: true,
    },
  },
  { sequelize, modelName: "Lop" }
);

module.exports = Lop;
