const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/databaseConn/sequelize");

class LoaiKiemTra extends Model {}

LoaiKiemTra.init(
  {
    TenLKT: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    HeSo: {
      type: DataTypes.INT,
      allowNull: false,
    },
  },
  { sequelize, modelName: "LoaiKiemTra" }
);

module.exports = LoaiKiemTra;
