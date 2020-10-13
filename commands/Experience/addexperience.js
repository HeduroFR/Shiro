const { MESSAGES } = require("../../utils/constants");

module.exports.run = (bot, message, args) => {
  const user = message.guild.member(message.mentions.users.first());
  const expToAdd = parseInt(args[1]);
  if (isNaN(expToAdd)) return message.reply("Faut entrer un nombre");
  bot.addExp(bot, user, expToAdd);
  message.channel.send(
    `${expToAdd} points d'expériences ont bien été ajouté à l'utilisateur ${user}`
  );
};

module.exports.help = MESSAGES.COMMANDS.EXPERIENCE.ADDEXPERIENCE;
