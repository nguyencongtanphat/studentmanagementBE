const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");
const lop = require("./lop");
const hocky = require("./hocky");

class BaoCaoTongKetHocKy extends Model {}

BaoCaoTongKetHocKy.init(
  {
    
    SoLuongDat: {
      type: DataTypes.INTEGER,
    },
    TiLe: {
      type: DataTypes.DECIMAL(3, 2),
    },
  },
  { sequelize, modelName: "BaoCaoTongKetHocKy" }
);
module.exports = BaoCaoTongKetHocKy;
