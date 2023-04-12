const app = require("./server.js"); 
const dotenv = require("dotenv"); 
const database = require("./src/utils/connection");


async function main() {
  dotenv.config();
  const port = process.env.PORT || 8000;
  try {
   await database.isConnected();
    app.listen(port, () => {
      console.log("Server is running on port: " + port);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main().catch(console.error);