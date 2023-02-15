const {Router} = require('express')

const mainRouter = Router();

mainRouter.get("/", (req, res) => {
	//el cb se llama controlador del endpoint
	res.status(200).json({mensaje: 'Hola mundo'})
});

mainRouter.get("/api", (req, res) => {
	res.status(200).send('estamos en api'); //express setea solo el content type
});

mainRouter.get("/characters", (req, res) => {
	res.status(200).send('estamos en api'); //express setea solo el content type
});

mainRouter.get("/location", (req, res) => {
	res.status(200).send('estamos en api'); //express setea solo el content type
});

mainRouter.get("/episodes", (req, res) => {
	res.status(200).send('estamos en api'); //express setea solo el content type
});

module.exports = mainRouter;