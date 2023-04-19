const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");
const monhoc = require("./monhoc")
const giaovien = require("./giaovien")
const quatrinhhoc = require("./quatrinhhoc")

class BangDiemMon extends Model {}

BangDiemMon.init(
  {
    MaBDM: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    DiemTBMon: {
      type: DataTypes.FLOAT(4, 2),
    },
  },
  { sequelize, modelName: "BangDiemMon" }
);

module.exports = BangDiemMon;
