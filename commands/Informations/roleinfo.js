const { MessageEmbed } = require("discord.js");
const { MESSAGES } = require("../../utils/constants");
const moment = require("moment");

module.exports.run = async (bot, message, args) => {
  const guild = message.guild;

  const target = guild.roles.cache.get(message.mentions.roles.first().id);

  const creation = target.createdAt - 7200000;

  const roleColor = target.hexColor;

  const categoryRole = target.hoist;
  if (categoryRole === true) {
    var categoryRoleAns = "Oui";
  } else if (categoryRole === false) {
    var categoryRoleAns = "Non";
  }

  const mentionableRole = target.mentionable;
  if (mentionableRole === true) {
    var mentionableRoleAns = "Oui";
  } else if (mentionableRole === false) {
    var mentionableRoleAns = "Non";
  }

  const roleMemberList = target.members.map((m) => m.user).join(", ");

  const embed = new MessageEmbed()
    .setColor(roleColor)
    .setDescription(
      `Crée le ${moment(creation)
        .locale("FR")
        .format("dddd Do MMMM YYYY à H:mm")}`
    )
    .setTitle(`${target.name}`)
    .addField("Couleur", `\`${roleColor}\``, true)
    .addField("Catégorisé", `${categoryRoleAns}`, true)
    .addField("ID", `${target.id}`, true)
    .addField("Mentionnable", `${mentionableRoleAns}`, false)
    .addField("Membres", `${roleMemberList}`, false)
    .addField("Type", `${guild}`, true)
    .addField(
      "Création du channel",
      `${bot.structure(
        moment(creation).locale("FR").format("dddd Do MMMM YYYY à H:mm")
      )}`,
      true
    )
    .setTimestamp()
    .setFooter(`${guild}`);

  if (guild.icon) {
    embed
      .setThumbnail(`${guild.iconURL()}`)
      .setFooter(`${guild}`, `${guild.iconURL()}`);
  }

  message.channel.send(embed);
};

module.exports.help = MESSAGES.COMMANDS.INFORMATIONS.ROLEINFO;
