const server = require('./app');
const port = 8080

async function main() {
    try {
      server.listen(port, ()=> console.log(`server listening on port ${port}`))//MODO PRUEBAS
    } catch (error) {
      console.error("Unable to connect to database");
    }
}
main();

