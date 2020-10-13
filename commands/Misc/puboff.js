const { MESSAGES } = require("../../utils/constants");
const { MessageEmbed } = require("discord.js");

module.exports.run = (bot, message, args) => {
  message.channel.send("Pong !");
};

module.exports.help = MESSAGES.COMMANDS.MISC.PUBOFF;
