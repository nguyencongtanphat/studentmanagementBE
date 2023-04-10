const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/databaseConn/sequelize");
const hocsinh = require("./hocsinh");
const lop = require("./lop");
const hocky = require("./hocky");
const giaovien = require("./giaovien");

class QuaTrinhHoc extends Model {}

QuaTrinhHoc.init(
  {
    MaQTH: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    MaHS: {
      type: DataTypes.INTEGER,
      references: {
        model: hocsinh,
        key: "MaHS",
      },
    },
    MaLop: {
      type: DataTypes.INTEGER,
      references: {
        model: lop,
        key: "MaLop",
      },
    },
    MaHK: {
      type: DataTypes.INTEGER,
      references: {
        model: hocky,
        key: "MaHK",
      },
    },
    MaGV: {
      type: DataTypes.INTEGER,
      references: {
        model: giaovien,
        key: "MaGV",
      },
    },
    DiemTBHK: {
      type: DataTypes.DOUBLE,
    },
  },
  { sequelize, modelName: "QuaTrinhHoc" }
);

module.exports = QuaTrinhHoc;
