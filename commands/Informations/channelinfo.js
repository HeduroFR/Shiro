const { MessageEmbed } = require("discord.js");
const { MESSAGES } = require("../../utils/constants");
const moment = require("moment");

module.exports.run = async (bot, message, args) => {
  const guild = message.guild;

  const target = bot.channels.cache.get(message.mentions.channels.first().id);

  const channelMemberCount = guild.channels.guild.members.cache.size;

  const channelOnlineCount = guild.channels.guild.members.cache.filter(
    (member) => member.presence.status === "online"
  ).size;

  const channelIdleCount = guild.channels.guild.members.cache.filter(
    (member) => member.presence.status === "idle"
  ).size;

  const channelDndCount = guild.channels.guild.members.cache.filter(
    (member) => member.presence.status === "dnd"
  ).size;

  const channelConnectedCount =
    channelOnlineCount + channelIdleCount + channelDndCount;

  const channelCategory = target.parent;
  const channelPosition = target.position;
  const channelType = target.type
    .replace("text", "Salon textuel")
    .replace("unknown", "Salon inconnu")
    .replace("voice", "Salon vocal");

  const creation = target.createdAt - 3600000;

  const embed = new MessageEmbed()
    .setColor("#FEFEFE")
    .setDescription(`Voici les informations pour le salon ${target}`)
    .setTitle(`${target.name}`)
    .addField("ID", `${target.id}`, true)
    .addField("Guild", `${guild}`, true)
    .addField("Membres", `${channelMemberCount}`, true)
    .addField("Connectés", `${channelConnectedCount}`, true)
    .addField("Catégorie", `${channelCategory.name}`, true)
    .addField("Position", `${channelPosition}`, true)
    .addField("Type", `${channelType}`, true)
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

module.exports.help = MESSAGES.COMMANDS.INFORMATIONS.CHANNELINFO;
