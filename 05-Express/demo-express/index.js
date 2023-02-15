const server = require('./src/app')

server.listen(3001, () => {
	console.log("escuchando al puerto 3001");
});