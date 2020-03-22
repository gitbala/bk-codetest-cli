#!/usr/bin/env node

const { program } = require("commander");
const fs = require("fs");
const path = require("path");

const fsPromises = fs.promises;
const { successMessage, errorMessage } = require("../util/Utilities");

program
  .description("find files")
  .usage("[option] [starting directory] [matching criteria and actions]")
  .arguments("[starting directory] [matching critera and actions]")
  .option("-name, --file-name", "filename")
  .option("-print, --display-path", "display pathname of matching files")
  .option("-delete, --delete-file", "delete a file")
  .parse(process.argv);

(async () => {
  const startingDirectory = program.args[0];
  const matchingCriteria = program.args[1];

  if (!startingDirectory || !matchingCriteria) {
    program.outputHelp();
    process.exit(1);
  }

  async function foundFiles() {
    const files = await fsPromises.readdir(startingDirectory);
    return files.filter((file) => path.extname(file) === matchingCriteria);
  }

  const filePath = await foundFiles();
  if (filePath.length <= 0) {
    errorMessage("no such file or directory...");
  } else if ((program.fileName && filePath.length > 0) || filePath.length > 0) {
    filePath.forEach((file) => {
      // eslint-disable-next-line no-console
      console.log(file);
    });
  }
  if (program.fileName && program.deleteFile) {
    filePath.forEach((file) => {
      fs.unlink(`${startingDirectory}/${file}`, (err) => {
        if (err) {
          errorMessage(`${file} not deleted`);
        } else {
          successMessage(`${file} deleted successfully`);
        }
      });
    });
  }
})();
