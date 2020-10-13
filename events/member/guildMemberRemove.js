const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = (bot, member) => {
  const logsChannel = bot.channels.cache.get("722559340933808148");

  const embed = new MessageEmbed()
    .setAuthor(`Départ d'un utilisateur`)
    .setColor("#dc143c")
    .setDescription(
      `**Action**: Utilisateur parti\n**Nom**: ${
        member.user.username
      }\n**Tag**: ${member.user.tag}\n**ID**: ${
        member.user.id
      }\n**Date**: ${moment().format(
        "D/MM/YYYY hh:mm:ss"
      )}\n**Compte créé**: ${moment
        .utc(member.joinedAt)
        .format("D/MM/YYYY hh:mm:ss")}`
    )
    .setTimestamp();

  if (member.user.avatar) {
    embed.setThumbnail(member.user.avatarURL());
  }

  logsChannel.send(embed);
};
