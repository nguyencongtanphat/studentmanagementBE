const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/databaseConn/sequelize");
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
    MaMon: {
      type: DataTypes.INTEGER,
      references: {
        model: monhoc,
        key: "MaMon",
      },
    },
    MaHK: {
      type: DataTypes.INTEGER,
      references: {
        model: hocky,
        key: "MaHK",
      },
    },
  },
  { sequelize, modelName: "BaoCaoTongKetMon" }
);

module.exports = BaoCaoTongKetMon;
