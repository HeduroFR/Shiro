const { MESSAGES } = require("../../utils/constants");
const { MessageEmbed } = require("discord.js");

module.exports.run = (bot, message, args) => {
  const replies = ["Oui", "Non", "Peut-être"];
  const question = args.join(" ");
  const response = Math.floor(Math.random() * replies.length);

  const embed = new MessageEmbed()
    .setAuthor(message.author.username)
    .setColor("#cb4e41")
    .addField(question, replies[response]);

  message.channel.send(embed);
};

module.exports.help = MESSAGES.COMMANDS.MISC.EIGHTBALL;
