const chalk = require("chalk");

module.exports = {
  successMessage: (msg) => console.log(`${chalk.green.bold(msg)}`),
  errorMessage: (msg) => console.log(`${chalk.red.bold(msg)}`),
};
