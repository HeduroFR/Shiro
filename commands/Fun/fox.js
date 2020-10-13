const { MESSAGES } = require("../../utils/constants");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const fox = await fetch("https://randomfox.ca/floof")
    .then((res) => res.json())
    .then((json) => json.image);

  const embed = new MessageEmbed()
    .setImage(fox)
    .setFooter("Powered by https://randomfox.ca/floof");

  message.channel.send(embed);
};

module.exports.help = MESSAGES.COMMANDS.FUN.FOX;
