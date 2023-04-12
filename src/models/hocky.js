const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

class HOCKY extends Model {}

HOCKY.init(
  {
    MaHK: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    HocKyThu: {
      type: DataTypes.SMALLINT,
      require: true,
    },
    NamHoc: {
      type: DataTypes.SMALLINT,
      require: true,
    },
  },
  { sequelize, modelName: "HOCKY" }
);

module.exports = HOCKY;
