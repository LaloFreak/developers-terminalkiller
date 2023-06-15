const server = require('./app');
const { PORT } = require('./config/config');
const { sequelize } = require("./db.js");
const port = PORT || 8080

async function main() {
    try {
      await sequelize.sync({force: true});
      console.log("succesfully connected");
      server.listen(port, ()=> console.log(`server listening on port ${port}`))//MODO PRUEBAS
    } catch (error) {
      console.error("Unable to connect to database");
    }
}
main();

