#!/usr/bin/env node

const { program } = require("commander");
const fs = require("fs");
const { successMessage, errorMessage } = require("../util/Utilities");

program
  .description("create new file, change file access and modification time")
  .usage("[option] file(s)...")
  .arguments("[option]")
  .option("-m, --modification-time", "changes only the modification time")
  .parse(process.argv);

const files = Array.from(program.args);
const isFile = !!(files.length > 0);
if (!isFile) {
  errorMessage("no filename provided...");
  program.outputHelp();
}

if (program.modificationTime) {
  const currentTime = new Date();
  files.forEach((fileName) => {
    fs.utimes(fileName, currentTime, currentTime, (err) => {
      if (err) {
        errorMessage("error in changing modificaiton time...");
      } else {
        successMessage(`${fileName} updated modified time...`);
      }
    });
  });
} else {
  files.forEach((fileName) => {
    fs.open(fileName, "w", (err) => {
      if (err) {
        errorMessage("error in changing file access or modification time...");
      } else {
        successMessage(`${fileName} created successfully`);
      }
    });
  });
}
