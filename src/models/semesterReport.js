const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

class SemesterReport extends Model {}

SemesterReport.init(
  {
    passedNumber: {
      type: DataTypes.INTEGER,
    },
    ratio: {
      type: DataTypes.DECIMAL(3, 2),
    },
  },
  { sequelize, modelName: "SemesterReport" }
);
module.exports = SemesterReport;
