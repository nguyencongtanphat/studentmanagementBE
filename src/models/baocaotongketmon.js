const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/databaseConn/sequelize");

class BaoCaoTongKetMon extends Model {}

BaoCaoTongKetMon.init(
  {
  },
  { sequelize, modelName: "BaoCaoTongKetMon" }
);

module.exports = BaoCaoTongKetMon;
