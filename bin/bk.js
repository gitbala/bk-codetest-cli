#!/usr/bin/env node

const { program } = require("commander");
const packageJSON = require("../package.json");

program
  .version(packageJSON.version)
  .usage("[command] [options]")
  .description("Command Line Utility for Unix Commands")
  .command("touch [option]", "create new file, change file access and modification time")
  .command("ls [option] [file|dir]", "list directory contents")
  .command("sed [option] [script] [input-file]", "stream editor")
  .command("find [option] [starting] [criteria]", "find files")
  .command("mv [option] [source] [target]", "move or rename files")
  .parse(process.argv);
