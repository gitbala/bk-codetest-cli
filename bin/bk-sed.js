#!/usr/bin/env node

const { program } = require("commander");
const fs = require("fs");

const fsPromises = fs.promises;
const readline = require("readline");

program
  .description("stream editor")
  .usage("[option] [script] [input-file]")
  .arguments("[option] [input-file]")
  .option("-w, --write-file <filename>", "write the current pattern space to filename")
  .option("-n, --modified-line", "print only modified line")
  .parse(process.argv);

(async () => {
  const inputs = program.args;
  const expression = Array.from(inputs);
  const isExpression = !!(expression.length > 0);

  if (!isExpression) {
    return program.outputHelp();
  }

  const script = inputs[0];
  const file = inputs[1];
  const subMatch = script.split("/");

  const isScript = () => {
    const sCommandMatch = script.search(/^s\//);
    return sCommandMatch >= 0;
  };

  const isTerminatedSubstitute = () => {
    const terminatedMatch = script.search(/\/$/);
    return (terminatedMatch >= 0) && (subMatch[2].length > 0);
  };

  if (!isScript()) {
    // eslint-disable-next-line no-console
    return console.log(`sed: 1: "${script}": undefined label '${script.substring(2)}'`);
  }

  if (!isTerminatedSubstitute()) {
    // eslint-disable-next-line no-console
    return console.log(`sed: 1: "${script}": unterminated substitute in regular expression`);
  }

  if (isScript() && !file) {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.on("line", (input) => {
      // eslint-disable-next-line no-console
      console.log(input);
    });
    return;
  }

  let fileContent = await fsPromises.readFile(file, "utf8");
  const patternMatchExp = new RegExp(subMatch[1], "g");
  const isPattern = fileContent.match(patternMatchExp);

  async function checkFileExists(filePath) {
    return fsPromises.access(filePath, fs.constants.F_OK || fs.constants.W_O)
      .then(() => true)
      .catch(() => false);
  }

  const isFile = await checkFileExists(file);
  if (!isFile) {
    // eslint-disable-next-line no-console
    return console.log(`sed: ${file}: No such file or directory`);
  }

  if (isScript() && isFile) {
    if (isPattern) {
      fileContent = fileContent.replace(patternMatchExp, subMatch[2]);
    }
    // eslint-disable-next-line no-console
    console.log(`${program.modifiedLine ? subMatch[2] : fileContent}`);
    if (program.writeFile && isPattern) {
      await fsPromises.writeFile(program.writeFile, fileContent);
    }
  }
})();
