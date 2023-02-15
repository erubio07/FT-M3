const express = require("express");
const server = express();
const morgan = require('morgan')
const mainRouter = require ('./routes/routes')

server.use((req, res, next) => {
    console.log('estamos recibiendo una req');
    console.log('estamos en un middle');
    next(); // una vez que termina sigue su camino
}); //esta funcion es el middleware, next le permite seguir el camino

server.use(morgan('dev'))

server.use(mainRouter)



module.exports = server;