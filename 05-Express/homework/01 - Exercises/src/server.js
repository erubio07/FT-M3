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
  const { author, title } = req.query;
  if (author && title) {
    const publicationsFiltered = publications.filter(
      (p) => p.author === author && p.title === title
    );
    publicationsFiltered.length
      ? res.status(200).json(publicationsFiltered)
      : res.status(400).json({
          error:
            "No existe ninguna publicación con dicho título y autor indicado",
        });
  } else {
    return res.status(400).json({
      error: "No existe ninguna publicación con dicho título y autor indicado",
    });
  }
});

server.get("/posts/:author", (req, res) => {
  const { author } = req.params;
  if (author) {
    const authorFiltered = publications.filter((p) => p.author === author);
    authorFiltered.length
      ? res.status(200).json(authorFiltered)
      : res
          .status(400)
          .json({ error: "El author indicado no existe en la base de datos" });
  } else {
    return res
      .status(400)
      .json({ error: "No existe ninguna publicación del autor indicado" });
  }
});

server.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  if (id && title && contents) {
    searchId = publications.find((p) => p.id === Number(id));
    if (searchId) {
      searchId = {
        ...searchId,
        title,
        contents,
      };
      res.status(200).json(searchId);
    } else {
      return res
        .status(400)
        .json({
          error:
            "No se recibió el id correcto necesario para modificar la publicación",
        });
    }
  } else {
    return res
      .status(400)
      .json({
        error:
          "No se recibieron los parámetros necesarios para modificar la publicación",
      });
  }
});

server.delete('/posts/:id', (req, res) => {
  // const {id} = req.params;
  // if(id){
  //   postFiltered = publications.filter(p => p.id !== id)
  //   if(postFiltered.length === publications.length){
  //     res.status(400).json({"error": "No se recibió el id correcto necesario para eliminar la publicación"})
  //   }else {
  //     publications = postFiltered;
  //     res.status(200).json({ success: true })
  //   }
  // }else {
  //   res.status(400).json({"error": "No se recibió el id correcto necesario para eliminar la publicación"})
  // }
  const {id} = req.params
    if(id){
        const postsFiltered = publications.filter(post => post.id !== id)
        if(postsFiltered.length === publications.length){
            res.status(400).json( {error: "No se recibió el id correcto necesario para eliminar la publicación"})
        }else{
            publications = postsFiltered
            res.status(200).json({ success: true })
        }
    }else{
        res.status(400).json({error: "No se recibió el id de la publicación a eliminar"})
    }
})

//NO MODIFICAR EL CODIGO DE ABAJO. SE USA PARA EXPORTAR EL SERVIDOR Y CORRER LOS TESTS
module.exports = { publications, server };
