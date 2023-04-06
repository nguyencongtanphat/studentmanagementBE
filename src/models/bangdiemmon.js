const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/databaseConn/sequelize");

class BangDiemMon extends Model {}

BangDiemMon.init(
  {
    DiemTBMon: {
      type: DataTypes.FLOAT(4, 2),
    },
  },
  { sequelize, modelName: "BangDiemMon" }
);

module.exports = BangDiemMon;
