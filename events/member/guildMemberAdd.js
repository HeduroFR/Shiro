const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports = async (bot, member) => {
  const logsChannel = bot.channels.cache.get("722559340933808148");
  const addAndRemoveMember = bot.channels.cache.get("675411275156815902");

  // const settings = await bot.getGuild(member.guild);
  // let msg = settings.welcomeMessage;

  // if (msg.includes("{{user}}")) msg = msg.replace("{{user}}", member);

  const embedA = new MessageEmbed()
    .setAuthor(`Arrivée d'un utilisateur`)
    .setColor("#dc143c")
    .setDescription(
      `**Action**: Nouvel utilisateur\n**Nom**: ${
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
    embedA.setThumbnail(member.user.avatarURL());
  }

  logsChannel.send(embedA);

  const embedB = new MessageEmbed()
    .setAuthor(`Arrivée d'un utilisateur`)
    .setColor("#dc143c")
    .setDescription(
      `**Action**: Nouvel utilisateur\n**Nom**: ${
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
    embedB.setThumbnail(member.user.avatarURL());
  }

  addAndRemoveMember.send(embedB);

  await bot.createUser({
    guildID: member.guild.id,
    guildName: member.guild.name,
    userID: member.id,
    username: member.user.tag,
  });
};
