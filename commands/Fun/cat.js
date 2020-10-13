const { MESSAGES } = require("../../utils/constants");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const cat = await fetch("https://aws.random.cat/meow")
    .then((res) => res.json())
    .then((json) => json.file);

  const embed = new MessageEmbed()
    .setImage(cat)
    .setFooter("Powered by https://aws.random.cat/meow");

  message.channel.send(embed);
};

module.exports.help = MESSAGES.COMMANDS.FUN.CAT;
