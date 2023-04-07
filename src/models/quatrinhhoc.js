const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/databaseConn/sequelize");
const hocsinh = require("./hocsinh");
const lop = require("./lop");
const hocky = require("./hocky");
const giaovien = require("./giaovien");

class QuaTrinhHoc extends Model {}

QuaTrinhHoc.init(
  {
    MaHS: {
      type: DataTypes.INTEGER,
      references: {
        model: hocsinh,
        key: "id",
      },
    },
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
    MaGV: {
      typee: DataTypes.INTEGER,
      references: {
        model: giaovien,
        key: "id"
      }
    },
    DiemTBHK: {
      type: DataTypes.DOUBLE,
    },
  },
  { sequelize, modelName: "QuaTrinhHoc" }
);

module.exports = QuaTrinhHoc;
