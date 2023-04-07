const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/databaseConn/sequelize");
const monhoc = require("./monhoc");
const hocky = require("./hocky");

class BaoCaoTongKetMon extends Model {}

BaoCaoTongKetMon.init(
  {
    MaMon: {
      type: DataTypes.INTEEGER,
      references: {
        model: monhoc,
        key: "id"
      }  
    },
    MaHK: {
      type: DataTypes.INTEGER,
      references: {
        model: hocky,
        key: "id"
      }
    }
  },
  { sequelize, modelName: "BaoCaoTongKetMon" }
);

module.exports = BaoCaoTongKetMon;
