const { MESSAGES } = require("../../utils/constants");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
  // message.react("⭐");
  var embedError = new MessageEmbed()
    .setTitle("Erreur")
    .setDescription(`● Vous devez rentrer un ID valide`)
    .setColor("#b30000")
    .setTimestamp()
    .setFooter("Erreur", `${bot.user.avatarURL()}`);

  switch (args[0]) {
    case "validate":
      if (!args[1]) {
        message.channel.send(embedError);
        return;
      } else {
        await message.channel.messages
          .fetch(args[1])
          .then((m) => m.react("✅"));
      }
      break;

    case "language":
      if (!args[1]) {
        message.channel.send(embedError);
        return;
      } else {
        await message.channel.messages
          .fetch(args[1])
          .then(
            (m) =>
              m.react("722560301320372316") && m.react("722560288108314667")
          );
      }
      break;
  }
};

module.exports.help = MESSAGES.COMMANDS.REACTIONS.EMOJI;
