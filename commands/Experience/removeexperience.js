const { MESSAGES } = require("../../utils/constants");

module.exports.run = (bot, message, args) => {
  const user = message.guild.member(message.mentions.users.first());
  const expToRemove = parseInt(args[1]);
  if (isNaN(expToRemove)) return message.reply("Faut entrer un nombre");
  bot.removeExp(bot, user, expToRemove);
  message.channel.send(
    `${expToRemove} points d'expériences ont bien été enlevé à l'utilisateur ${user}`
  );
};

module.exports.help = MESSAGES.COMMANDS.EXPERIENCE.REMOVEEXPERIENCE;
