const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");
const monhoc = require("./monhoc");
const hocky = require("./hocky");

class BaoCaoTongKetMon extends Model {}

BaoCaoTongKetMon.init(
  {
    MaBCTKM: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    
  },
  { sequelize, modelName: "BaoCaoTongKetMon" }
);

module.exports = BaoCaoTongKetMon;
