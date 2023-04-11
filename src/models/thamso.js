const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/databaseConn/sequelize");

class ThamSo extends Model {}

ThamSo.init(
  {
    TenThamSo: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    GiaTri: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  },
  { sequelize, modelName: "ThamSo" }
);

module.exports = ThamSo;