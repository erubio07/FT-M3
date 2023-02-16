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
    res.status(200).json(publications);
  }
});

server.get("/posts", (req, res) => {
  const {author, title} = req.query;
  if(author && title){
    const result = publications.filter(pub => pub.author == author && pub.title == title)
    res.status(200).json(result);
  }else {
    res.status(400).json({"error": "No existe ninguna publicación con dicho título y autor indicado"});
  }
});

server.get('/posts/:author', (req, res) =>{
 const {author} = req.params;
 if(author){
  const searchPublications = publications.filter(p => p.author == author)
  res.status(200).json(searchPublications);
 }else{
  res.status(404).json({"error": "No existe ninguna publicación del autor indicado"})
 }
})

//NO MODIFICAR EL CODIGO DE ABAJO. SE USA PARA EXPORTAR EL SERVIDOR Y CORRER LOS TESTS
module.exports = { publications, server };
