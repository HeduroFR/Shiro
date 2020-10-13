const { MESSAGES } = require("../../utils/constants");

module.exports.run = (bot, message, args) => {
  console.log("C'est ok !");
};

module.exports.help = MESSAGES.COMMANDS.OWNER.TEST;
