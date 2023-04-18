const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

const ThamSo = sequelize.define("ThamSo", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  TuoiToiThieu: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  TuoiToiDa: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  SiSoToiDa: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  DiemDatMon: {
    type: DataTypes.FLOAT(4, 2),
    allowNull: false,
  },
  DiemDat: {
    type: DataTypes.FLOAT(4, 2),
    allowNull: false,
  },
});
module.exports = ThamSo;