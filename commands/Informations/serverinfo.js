const { MessageEmbed } = require("discord.js");
const { MESSAGES } = require("../../utils/constants");
const moment = require("moment");

module.exports.run = async (bot, message, args) => {
  message.delete();

  const target = message.guild;

  const creation = target.createdAt - 7200000;

  const roleArray = message.guild.roles.cache.map((n) => n.name);
  roleArray.shift();
  const roleJoined = roleArray.join(", ");
  const roleCount = roleArray.length;

  const onlineMember = target.members.cache.filter(
    (member) => member.presence.status === "online"
  ).size;

  const idleMember = target.members.cache.filter(
    (member) => member.presence.status === "idle"
  ).size;

  const dndMember = target.members.cache.filter(
    (member) => member.presence.status === "dnd"
  ).size;

  const offlineMember = target.members.cache.filter(
    (member) => member.presence.status === "offline"
  ).size;

  const botCount = target.members.cache.filter((member) => member.user.bot)
    .size;

  const humanCount = target.members.cache.filter((member) => !member.user.bot)
    .size;

  const connectedMember = onlineMember + idleMember + dndMember;

  const serverOwner = target.member(target.owner);

  const channelTextSize = target.channels.cache.filter(
    (channel) => channel.type === "text"
  ).size;

  const channelVoiceSize = target.channels.cache.filter(
    (channel) => channel.type === "voice"
  ).size;

  const channelCount = channelTextSize + channelVoiceSize;

  const premiumTier = target.premiumTier;

  const premiumCount = target.premiumSubscriptionCount;

  const region = bot.structure(target.region);

  const join = message.guild.member(message.author).joinedAt - 7200000;

  const verificationLevel = target.verificationLevel
    .replace("NONE", "Aucune vérification")
    .replace("LOW", "Vérification faible")
    .replace("MEDIUM", "Vérification moyenne")
    .replace("HIGH", "Vérification haute")
    .replace("VERY_HIGH", "Vérification très haute");

  const explicitContentLevel = target.explicitContentFilter
    .replace("DISABLED", "Aucun filtre de contenu")
    .replace(
      "MEMBERS_WITHOUT_ROLES",
      "Filtre des contenus uniquement pour les membres sans rôles"
    )
    .replace(
      "ALL_MEMBERS",
      "Filtre des contenus pour tout les membres du serveur"
    );

  const embed = new MessageEmbed()
    .setTitle(`${target}`)
    .setColor("#FEFEFE")
    .setDescription(`Voici les informations pour le serveur **${target}**`)
    //.setAuthor(`${target.username}`, `${target.avatarURL()}`)
    .addField("ID", `${target.id}`, true)
    .addField("Membres", `${target.memberCount}`, true)
    .addField("Connecté(s)", `${connectedMember}`, true)
    .addField("Humains", `${humanCount}`, true)
    .addField("Bot", `${botCount}`, true)
    .addField("Créateur", `${serverOwner.user.tag}`, true)
    .addField("Région", `${region}`, true)
    .addField(
      "Boosters",
      `Palier ${premiumTier} (${premiumCount} boosts)`,
      true
    )
    .addField("Salons", `${channelCount}`, true)
    .addField("Analyse du contenu", `${explicitContentLevel}`)
    .addField("Niveau de vérification", `${verificationLevel}`)
    .addField(`Rôles [${roleCount}]`, `${roleJoined || "Aucun rôle"}`)
    .addField(
      "Création du serveur",
      `${bot.structure(
        moment(creation).locale("FR").format("dddd Do MMMM YYYY à H:mm")
      )}`,
      true
    )
    .addField(
      "Date d'arrivée",
      `${bot.structure(
        moment(join).locale("fr").format("dddd Do MMMM YYYY à H:mm")
      )}`,
      true
    )
    .setTimestamp()
    .setFooter(
      `${target}`
    ); /*
    .addField(
      "Date d'arrivée",
      `${bot.structure(
        moment(join).locale("fr").format("dddd Do MMMM YYYY à H:mm")
      )}`,
      true
    );*/

  if (target.icon) {
    embed
      .setThumbnail(`${target.iconURL()}`)
      .setFooter(`${target}`, `${target.iconURL()}`);
  }

  message.channel.send(embed);
};

module.exports.help = MESSAGES.COMMANDS.INFORMATIONS.SERVERINFO;
