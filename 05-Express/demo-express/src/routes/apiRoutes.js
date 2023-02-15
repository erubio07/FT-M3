const { Router } = require("express");
const database = require("../database");

const apiRouter = Router();

apiRouter.get("/", (req, res) => {
	const { name } = req.query;
	if (name) {
		const searchResult = database.filter((char) => char.name === name);
		res.status(200).json(searchResult);
	} else {
		res.status(200).json(database); //express setea solo el content type
	}
});

apiRouter.get("/:id", (req, res) => {
	try {
		const { id } = req.params;
		const character = database.find((char) => char.id == id);
		if (!character) throw Error("character dos not found");
		//console.log(character);
		res.status(200).json(character);
	} catch (error) {
		res.status(404).json({ error: error.message });
	}
	//res.status(200).send(id); //express setea solo el content type
});

apiRouter.post("/", (req, res) => {
	const { name, gender } = req.body;
	const newChar = {
		id: database.length + 1,
		name,
		gender,
		species: "Human",
		status: "alive",
	};
	database.push(newChar);
	res.status(200).json({ status: "ok" });
});

// apiRouter.delete('/id', (req, res) => {
//     //aplicamos filter
// })

module.exports = apiRouter;
