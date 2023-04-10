const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/databaseConn/sequelize");
const bangdiemmon = require("./bangdiemmon");
const loaikiemtra = require("./loaikiemtra");

class CT_BangDiemMon extends Model {}

CT_BangDiemMon.init(
  {
    MaCTBDM: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    MaBDM: {
      type: DataTypes.INTEGER,
      references: {
        model: bangdiemmon,
        key: "MaBDM",
      },
    },
    MaLKT: {
      type: DataTypes.INTEGER,
      references: {
        model: loaikiemtra,
        key: "MaLKT",
      },
    },
    Diem: DataTypes.FLOAT(4, 2),
  },
  { sequelize, modelName: "CT_BangDiemMon" }
);

module.exports = CT_BangDiemMon;
