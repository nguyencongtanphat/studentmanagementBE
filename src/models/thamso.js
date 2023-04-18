const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

const ThamSo = sequelize.define("ThamSo", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  TenThamSo: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  GiaTri: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});
module.exports = ThamSo;