const {  Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/databaseConn/sequelize");

class HocSinh extends Model{}

HocSinh.init(
  {
    MaHS: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    HoTen: {
      type: DataTypes.STRING,
      require: true,
    },
    DiaChi: {
      type: DataTypes.STRING,
      require: true,
    },
    NamSinh: {
      type: DataTypes.DATEONLY,
      require: true,
    },
    GioiTinh: {
      type: DataTypes.ENUM("Nam", "Nữ"),
      require: true,
    },
    Email: {
      type: DataTypes.STRING,
      require: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  { sequelize, modelName: "HocSinh" }
);

module.exports = HocSinh;
