const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/databaseConn/sequelize");
const monhoc = require("./monhoc")
const giaovien = require("./giaovien")
const quatrinhhoc = require("./quatrinhhoc")

class BangDiemMon extends Model {}

BangDiemMon.init(
  {
    MaQTH: {
      type: DataTypes.INTEGER,
      references: {
        model: quatrinhhoc,
        key: "id"
      }
    },
    MaGV: {
      type: DataTypes.INTEGER,
      references: {
        model: giaovien,
        key: "id"
      }
    },
    MaMon: {
      type: DataTypes.INTEGER,
      references: {
        model: monhoc,
        key: "id"
      }
    },
    DiemTBMon: {
      type: DataTypes.FLOAT(4, 2),
    },
  },
  { sequelize, modelName: "BangDiemMon" }
);

module.exports = BangDiemMon;
