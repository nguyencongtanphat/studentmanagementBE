const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/databaseConn/sequelize");

class KhoiLop extends Model {}

KhoiLop.init(
  {
    MaKhoi: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Khoi: {
      type: DataTypes.SMALLINT,
      require: true,
    },
  },
  { sequelize, modelName: "KhoiLop" }
);

module.exports = KhoiLop;
