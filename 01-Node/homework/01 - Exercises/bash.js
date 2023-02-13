const { clear } = require("console");
const process = require("process");
const commands = require("./commands/index.js");

const print = (ouput) => {
  process.stdout.write(ouput);
  process.stdout.write("\nprompt > ");
};

function bash() {
  process.stdout.write("prompt > ");
  process.stdin.on("data", (data) => {
    let args = data.toString().trim().split(" ");
    //console.log(args);
    let cmd = args.shift();
    //console.log(cmd);
    if (!commands[cmd]) {
      print(`command not found: ${cmd}`);
    } else {
      commands[cmd](print, args);
    }
  });
}

bash();
module.exports = {
  print,
  bash,
};
