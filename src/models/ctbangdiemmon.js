const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/databaseConn/sequelize");
const bangdiemmon = require("./bangdiemmon");
const loaikiemtra = require("./loaikiemtra");

class CT_BangDiemMon extends Model {}

CT_BangDiemMon.init(
  {
    MaBDM: {
      type: DataTypes.INTEGER,
      references: {
        model: bangdiemmon,
        key: "id"
      }
    },
    MaLKT: {
      type: DataTypes.INTEGER,
      references: {
        model: loaikiemtra,
        key: "id"
      }
    },
    Diem: DataTypes.FLOAT(4, 2),
  },
  { sequelize, modelName: "CT_BangDiemMon" }
);

module.exports = CT_BangDiemMon;
