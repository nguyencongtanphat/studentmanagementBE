const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");
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
    
    DiemTBHK: {
      type: DataTypes.DOUBLE,
    },
  },
  { sequelize, modelName: "QuaTrinhHoc" }
);

module.exports = QuaTrinhHoc;
