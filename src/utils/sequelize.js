const { Sequelize } = require("sequelize");
require("dotenv").config();


const sequelize = new Sequelize("managestudent", "root", "2911", {
  host: "localhost",
  dialect: "mysql",
  define: {
    freezeTableName: true,
  },
});


// const sequelize = new Sequelize(
//   process.env.DBNAME,
//   process.env.DBUSERNAME,
//   process.env.DBPASSWORD,
//   {
//     dialect: "mysql",
//     host: process.env.DBHOST,
//     define: {
//       freezeTableName: true,
//     },
//   }
// );

module.exports = sequelize;
