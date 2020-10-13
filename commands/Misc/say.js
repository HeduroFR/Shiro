const { MESSAGES } = require("../../utils/constants");
const { MessageEmbed } = require("discord.js");

module.exports.run = (bot, message, args) => {
  const gTarget = message.guild;

  message.delete();
  if (args) {
    message.channel.send(args.join(" "));
  } else {
    const eEmbed = new MessageEmbed()
      .setColor("#dc143c")
      .setTitle(`Erreur`)
      .setDescription(`Veuillez préciser le texte que vous souhaiter envoyer`)
      .setTimestamp()
      .setFooter(`${gTarget}`);

    if (gTarget.icon) {
      embed.setFooter(`${gTarget}`, `${gTarget.iconURL()}`);
    }

    message.channel.send(eEmbed);
  }
};

module.exports.help = MESSAGES.COMMANDS.MISC.SAY;
