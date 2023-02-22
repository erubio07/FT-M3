/*********** Yo explico `exerciseUtils` ********
 *
 * excersiceUtils es una variable que viene de un archivo en este repo
 * El archivo `./utils` esta en este nivel y se llama `utils.js`
 *
 * Este archivo crea un `promisifiedReadFile` - FIJATE EN ÉL!!!
 *
 * Las funciones `blue` y `magenta` para mantener tu código DRY
 *
 ***********************************************/

"use strict";

let exerciseUtils = require("./utils");

let args = process.argv.slice(2).map(function (st) {
  return st.toUpperCase();
});

module.exports = {
  problemA: problemA,
  problemB: problemB,
  problemC: problemC,
  problemD: problemD,
  problemE: problemE,
  problemF: problemF,
};

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function (arg) {
  var problem = module.exports["problem" + arg];
  if (problem) problem();
});

async function problemA() {
  // callback version
  exerciseUtils.readFile("poem-one/stanza-01.txt", function (err, stanza) {
    console.log("-- A. callback version --");
    exerciseUtils.blue(stanza);
  });

  // asyncawait version
  // Tu código acá:

  //creo la funcion. Await, llamo a exerciseUtils.promisfiedReadFile y como parametro le paso stanza-01, si sale todo bien ejecuto blue con stanza-01 como parametro
}

async function problemB() {
  // callback version
  exerciseUtils.readFile("poem-one/stanza-02.txt", function (err, stanza2) {
    console.log("-- B. callback version (stanza two) --");
    exerciseUtils.blue(stanza2);
  });
  exerciseUtils.readFile("poem-one/stanza-03.txt", function (err, stanza3) {
    console.log("-- B. callback version (stanza three) --");
    exerciseUtils.blue(stanza3);
  });

  // asyncawait version
  // Tu código acá:

  //lo mismo que el ejecricio 01 pero dos veces con las estanzas respectivas.
}

async function problemC() {
  // callback version
  exerciseUtils.readFile("poem-one/stanza-02.txt", function (err, stanza2) {
    console.log("-- C. callback version (stanza two) --");
    exerciseUtils.blue(stanza2);
    exerciseUtils.readFile("poem-one/stanza-03.txt", function (err, stanza3) {
      console.log("-- C. callback version (stanza three) --");
      exerciseUtils.blue(stanza3);
      console.log("-- C. callback version done --");
    });
  });

  // asyncawait version
  // Tu código acá:

  // lo mismo que el anterior
}

async function problemD() {
  // callback version
  exerciseUtils.readFile(
    "poem-one/wrong-file-name.txt",
    function (err, stanza4) {
      console.log("-- D. callback version (stanza four) --");
      if (err) exerciseUtils.magenta(new Error(err));
      else exerciseUtils.blue(stanza4);
    }
  );

  // asyncawait version
  // Tu código acá:

  //usamo try catch. Dentro del try tenemos la funcion await, pasamos como argumento el poem-one.
  //si sale todo bien ejecutamos blue, con stanza -04
  //si hay algún error en el catch ejecutamos magenta
  //tener en cuanta que la sintaxys del try-catch es paraceida a un if else solo que el try no recibe parametros
}

async function problemE() {
  // callback version
  exerciseUtils.readFile("poem-one/stanza-03.txt", function (err, stanza3) {
    console.log("-- E. callback version (stanza three) --");
    if (err) return exerciseUtils.magenta(new Error(err));
    exerciseUtils.blue(stanza3);
    exerciseUtils.readFile(
      "poem-one/wrong-file-name.txt",
      function (err2, stanza4) {
        console.log("-- E. callback version (stanza four) --");
        if (err2) return exerciseUtils.magenta(err2);
        exerciseUtils.blue(stanza4);
      }
    );
  });

  // asyncawait version
  // Tu código acá:

  //Usamos try Catch. En catch pasamos magenta con el error. Dentro del try hacemos dos constantes donde espperamos la respuesta de la llamadas a los archivos
  //despues ejecutamos blue con estanza 3 y 4 respectivamente.
}

async function problemF() {
  // callback version
  exerciseUtils.readFile("poem-one/stanza-03.txt", function (err, stanza3) {
    console.log("-- F. callback version (stanza three) --");
    if (err) {
      if (err) exerciseUtils.magenta(new Error(err));
      console.log("-- F. callback version done --");
      return;
    }
    exerciseUtils.blue(stanza3);
    exerciseUtils.readFile(
      "poem-one/wrong-file-name.txt",
      function (err2, stanza4) {
        console.log("-- F. callback version (stanza four) --");
        if (err2) exerciseUtils.magenta(new Error(err2));
        else exerciseUtils.blue(stanza4);
        console.log("-- F. callback version done --");
      }
    );
  });

  // asyncawait version
  // Tu código acá:

  //este ejercicio es igual que el anterior.
  //el método finally, es algo que se ejecutra despues de que se haga el try o se haga el catch. Se ejecuta si o si.
  //dentro del finally se pouede poner el console.log(done)
}
