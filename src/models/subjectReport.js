const { Model, DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize");

class SubjectReport extends Model {}

SubjectReport.init(
  {
    idSR: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  },
  { sequelize, modelName: "SubjectReport" }
);

module.exports = SubjectReport;
