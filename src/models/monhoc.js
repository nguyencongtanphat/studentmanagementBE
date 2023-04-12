const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

class MonHoc extends Model {}

MonHoc.init(
  {
    MaMon: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    TenMon: {
      type: DataTypes.STRING,
      require: true,
    },
    HeSo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    DiemDat: {
      type: DataTypes.FLOAT(4, 2),
    },
  },
  { sequelize, modelName: "MonHoc" }
);

module.exports = MonHoc;
