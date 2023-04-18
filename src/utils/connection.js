const associate = require("../models/association");
const sequelize = require("./sequelize");
const fs = require("fs");
const readline = require("readline");

const database = {
    isConnected: async () =>{
        //   await sequelize.authenticate()
        //   .then(async ()=>{
            
        //   })
        try {
          await sequelize.authenticate();
          const isForce = true; // change this to true to reset to default db
          associate();
          await sequelize.sync({ force: isForce });
          // load data
          if (isForce) {
            const fileName = process.env.DATAFILE;
            const rawData = fs.createReadStream(fileName);
            const rl = readline.createInterface({
              input: rawData,
              crlfDelay: Infinity,
            });
            for await (const line of rl) {
              if (line) sequelize.query(line);
            }
          }
          console.log("Connection has been established successfully.");
        } catch (error) {
          throw Error(`Unable to connect to the database: ${error}`);
        }
    }
}

module.exports = database
