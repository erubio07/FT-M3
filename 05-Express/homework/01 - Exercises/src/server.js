const express = require("express");

let publications = [];

const server = express();

server.use(express.json());

server.post("/posts", (req, res) => {
  const { author, title, contents } = req.body;
  if (!author || !title || !contents) {
    res.status(404).send({
      error:
        "No se recibieron los parámetros necesarios para crear la publicación",
    });
  } else {
    const newPublications = {
      id: publications.length + 1,
      author,
      title,
      contents,
    };
    publications.push(newPublications);
    res.status(200).json(newPublications);
  }
});

server.get("/posts", (req, res) => {
  const { author, title } = req.query;
  if (!author || !title) {
    req
      .status(404)
      .json({
        error:
          "No existe ninguna publicación con dicho título y autor indicado",
      });
  } else {
    let result = publications.find(
      (pub) => pub.author == author && pub.title == title
    );
    res.status(200).send(result);
  }
});

//NO MODIFICAR EL CODIGO DE ABAJO. SE USA PARA EXPORTAR EL SERVIDOR Y CORRER LOS TESTS
module.exports = { publications, server };
