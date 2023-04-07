const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/databaseConn/sequelize");
const lop = require("./lop");
const hocky = require("./hocky");

class BaoCaoTongKetHocKy extends Model {}

BaoCaoTongKetHocKy.init(
  {
    MaLop: {
      type: DataTypes.INTEGER,
      references: {
        model: lop,
        key: "id",
      },
    },
    MaHK: {
      type: DataTypes.INTEGER,
      references: {
        model: hocky,
        key: "id",
      },
    },   
    SoLuongDat: {
      type: DataTypes.INTEGER,
      
    },
    TiLe: {
      type: DataTypes.DECIMAL(3, 2),
      
    },
  },
  { sequelize, modelName: "BaoCaoTongKetHocKy" }
);
