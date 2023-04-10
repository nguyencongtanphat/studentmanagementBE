const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/databaseConn/sequelize");

class GiaoVien extends Model {}

GiaoVien.init(
  {
    MaGV: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    HoTen: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DiaChi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    NamSinh: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    GioiTinh: {
      type: DataTypes.ENUM("Nam", "Nữ"),
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    NgayNhanViec: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  { sequelize, modelName: "GiaoVien" }
);

module.exports = GiaoVien;
