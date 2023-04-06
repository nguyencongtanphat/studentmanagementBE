const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/databaseConn/sequelize");

class MonHoc extends Model {}

MonHoc.init(
  {
    TenMon: {
      type: DataTypes.STRING,
      require: true,
    },
    HeSo: {
      type: DataTypes.INT,
      allowNull: false,
    },
    MaGV: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, modelName: "MonHoc" }
);

module.exports = MonHoc;
