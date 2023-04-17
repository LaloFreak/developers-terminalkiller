const port = process.env.PORT || 8080
const server = require('./app');
const { sequelize } = require("./db.js");

async function main() {
    try {
      console.log("succesfully connected");
      server.listen(port, ()=> console.log(`server listening on port ${port}`))//MODO PRUEBAS
    } catch (error) {
      console.error("Unable to connect to database");
    }
}
main();

