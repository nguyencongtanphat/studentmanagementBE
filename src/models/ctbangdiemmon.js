const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/databaseConn/sequelize");

class CT_BangDiemMon extends Model {}

CT_BangDiemMon.init(
  {
    Diem: DataTypes.FLOAT(4, 2),
  },
  { sequelize, modelName: "CT_BangDiemMon" }
);

module.exports = CT_BangDiemMon;
