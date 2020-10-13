const { MESSAGES } = require("../../utils/constants");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const user = message.guild.member(message.mentions.users.first());
  const pubRole = message.guild.roles.cache.get("720660959454298165");

  if (!user) {
    return;
  }
  if (user.roles.cache.has(pubRole)) {
    const embed = new MessageEmbed()
      .setTitle("Pub")
      .setDescription(
        `● Cet utilisateur fait déjà parti des utilisateurs autorisés`
      )
      .setColor("#b30000")
      .setTimestamp()
      .setFooter("Erreur", `${bot.user.avatarURL()}`);

    message.channel.send(embed);
  } else {
    await user.roles.add(pubRole);
    const embed = new MessageEmbed()
      .setTitle("Pub")
      .setDescription(
        `● ${user.user.username} a été ajouté avec succès à la liste des utilisateurs autorisés`
      )
      .setColor("#095228")
      .setTimestamp()
      .setFooter("Succès", `${bot.user.avatarURL()}`);

    message.channel.send(embed);
  }
};

module.exports.help = MESSAGES.COMMANDS.MISC.PUBON;
