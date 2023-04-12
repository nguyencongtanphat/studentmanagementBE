const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

class LoaiKiemTra extends Model {}

LoaiKiemTra.init(
  {
    MaLKT: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    TenLKT: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    HeSo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, modelName: "LoaiKiemTra" }
);

module.exports = LoaiKiemTra;
