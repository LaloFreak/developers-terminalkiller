const server = require('./app');
const { PORT } = require('./config');
const db = require("./integrations/mongodb");

async function main() {
    try {
      await db.connect();
      console.log("succesfully connected");
      server.listen(PORT, ()=> console.log(`server listening on port ${PORT}`))
    } catch (error) {
      server.listen(PORT, ()=> console.log(`server listening on port ${PORT} (db disconected)`))
      console.error("Unable to connect to database");
    }
}
main();
