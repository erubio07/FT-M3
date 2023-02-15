const {Router} = require('express');
const apiRouter = require('./apiRoutes');

const mainRouter = Router();

mainRouter.get("/", (req, res) => {
	//el cb se llama controlador del endpoint
	res.status(200).json({mensaje: 'Hola mundo'})
});

mainRouter.use('/api', apiRouter);



module.exports = mainRouter;