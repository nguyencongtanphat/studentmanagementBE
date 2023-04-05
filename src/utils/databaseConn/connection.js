const sequelize = require("./sequelize");

const database = {
    isConnected: async () =>{
        //   await sequelize.authenticate()
        //   .then(async ()=>{
            
        //   })
        try {
          await sequelize.authenticate();
          console.log("Connection has been established successfully.");
        } catch (error) {
          throw Error(`Unable to connect to the database: ${error}`);
        }
    }
}

module.exports = database
