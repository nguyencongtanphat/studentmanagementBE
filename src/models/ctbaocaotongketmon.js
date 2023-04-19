const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");
const baocaotongketmon = require("./baocaotongketmon")
const lop = require("./lop");

class CtBaoCaoTongKetMon extends Model {}

CtBaoCaoTongKetMon.init(
  {
    MaBCTKM: {
      type: DataTypes.INTEGER,
      references: {
        model: baocaotongketmon,
        key: "MaBCTKM",
      },
    },
    
    SoLuongDat: {
      type: DataTypes.INTEGER,
      require: true,
    },
    TiLe: {
      type: DataTypes.DECIMAL(3, 2),
    },
  },
  { sequelize, modelName: "CtBaoCaoTongKetMon" }
);

module.exports = CtBaoCaoTongKetMon;
