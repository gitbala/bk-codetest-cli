#!/usr/bin/env node

const { program } = require("commander");
const fs = require("fs");
const { errorMessage } = require("../util/Utilities");

program
  .description("list directory contents")
  .usage("[option] [file|dir]")
  .arguments("[option] [file|dir]")
  .parse(process.argv);

fs.readdir(".", (err, files) => {
  if (err) {
    errorMessage("error in directory...");
  }
  let list = "";
  files.forEach((file) => {
    list += `${file}\n`;
  });
  // eslint-disable-next-line no-console
  console.log(list);
});
