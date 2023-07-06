const server = require('./app');
const port = 8080;
const db = require("./integrations/mongodb");

async function main() {
    try {
      await db.connect();
      console.log("succesfully connected");
      server.listen(port, ()=> console.log(`server listening on port ${port}`))//MODO PRUEBAS
    } catch (error) {
      server.listen(port, ()=> console.log(`server listening on port ${port} (db disconected)`))//MODO PRUEBAS
      console.error("Unable to connect to database");
    }
}
main();
