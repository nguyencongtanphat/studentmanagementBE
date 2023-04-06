const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/databaseConn/sequelize");

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
