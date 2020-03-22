#!/usr/bin/env node

const { program } = require("commander");
const chalk = require("chalk");
const fs = require("fs");
const { prompt } = require("inquirer");
const { successMessage, errorMessage } = require("../util/Utilities");

const fsPromises = fs.promises;

program
  .description("move or rename files")
  .usage("[option] [source] [target]")
  .arguments("[option] [source] [target]")
  .option("-i, --overwrite-file", "overwrite file")
  .option("-b, --backup-file", "backup file")
  .option("-v, --verbose-file", "verbose file")
  .parse(process.argv);

(async () => {
  const moveFileArgs = program.args;
  const source = moveFileArgs[0];
  const target = moveFileArgs[1];

  async function moveOrRenameFile() {
    try {
      await fsPromises.rename(source, target);
      successMessage("file moved successfully");
      if (program.verboseFile) {
        // eslint-disable-next-line no-console
        console.log(`${source} -> ${target}`);
      }
    } catch {
      errorMessage("error in renaming a file");
      program.outputHelp();
    }
  }

  async function backupFile(file) {
    const fileExists = await fsPromises.access(file, fs.constants.F_OK || fs.constants.W_O)
      .then(() => true)
      .catch(() => false);
    if (fileExists) {
      const fileContent = await fsPromises.readFile(file, "utf8");
      await fsPromises.writeFile(`${file}.bak`, fileContent);
    } else {
      // eslint-disable-next-line no-console
      console.log(`${chalk.red.bold("file not found...")}`);
    }
  }
  if (program.overwriteFile) {
    const answers = await prompt([
      {
        type: "confirm",
        name: "overWrite",
        message: `overwrite '${target}'?`,
      },
    ]);
    if (answers.overWrite) {
      await moveOrRenameFile();
    } else {
      errorMessage("file not moved...");
    }
  } else if (program.backupFile) {
    await backupFile(target);
    await moveOrRenameFile();
  } else {
    await moveOrRenameFile();
  }
})();
