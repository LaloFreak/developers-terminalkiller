const port = process.env.PORT || 8080
const server = require('./app');

async function main() {
    server.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`));
}
exports.yourExpressApp = main();

