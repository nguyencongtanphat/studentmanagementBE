const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/databaseConn/sequelize");
const monhoc = require("./monhoc")
const giaovien = require("./giaovien")
const quatrinhhoc = require("./quatrinhhoc")

class BangDiemMon extends Model {}

BangDiemMon.init(
  {
    MaBDM: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    MaQTH: {
      type: DataTypes.INTEGER,
      references: {
        model: quatrinhhoc,
        key: "MaQTH",
      },
    },
    MaGV: {
      type: DataTypes.INTEGER,
      references: {
        model: giaovien,
        key: "MaGV",
      },
    },
    MaMon: {
      type: DataTypes.INTEGER,
      references: {
        model: monhoc,
        key: "MaMon",
      },
    },
    DiemTBMon: {
      type: DataTypes.FLOAT(4, 2),
    },
  },
  { sequelize, modelName: "BangDiemMon" }
);

module.exports = BangDiemMon;
