const { MessageEmbed } = require("discord.js");
const { MESSAGES } = require("../../utils/constants");
const moment = require("moment");

module.exports.run = async (bot, message, args) => {
  const gTarget = message.guild;

  const uTarget = bot.users.cache.get(message.mentions.users.first().id);

  /*
  if (!message.guild.member(target).presence.activities[0].createdAt) {
    var timeF = "Pas défini";
  } else {
    var timeF = funct.structure(
      moment(
        message.guild.member(target).presence.activities[0].createdAt - 7200000
      )
        .locale("FR")
        .format("dddd Do MMMM YYYY à H:mm")
    );
  }
*/

  const creation = uTarget.createdAt - 7200000;
  const join = message.guild.member(uTarget).joinedAt - 7200000;

  const status = message.guild.member(uTarget).presence.status;
  const statusFR = status
    .replace("dnd", "🔴 Ne pas déranger")
    .replace("idle", "🟡 Absent")
    .replace("offline", "⚫ Hors ligne")
    .replace("online", "🟢 Connecté");

  const roleArray = message.guild
    .member(uTarget)
    .roles.cache.map((n) => n.name)
    .slice(0, -1)
    .join(", ");

  const embed = new MessageEmbed()
    .setColor("#FEFEFE")
    .setDescription(
      `Voici les informations pour l'utilisateur **${uTarget.tag}**`
    )
    .setAuthor(`${uTarget.username}`, `${uTarget.avatarURL()}`)
    .addField("Mention", `${uTarget}`, true)
    .addField("ID", `${uTarget.id}`, true)
    .addField("Status", `${statusFR}`, true)

    .addField(
      "Création du compte",
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
    .addField("Rôle(s)", `${roleArray || "Aucun rôle"}`)
    .setTimestamp()
    .setFooter(`${gTarget}`);

  if (gTarget.icon) {
    embed
      .setThumbnail(`${gTarget.iconURL()}`)
      .setFooter(`${gTarget}`, `${gTarget.iconURL()}`);
  }

  if (message.guild.member(uTarget).presence.activities) {
    embed.addField(
      `Activité`,
      `Nom : ${message.guild.member(uTarget).presence.activities.join(" ")}`,
      false
    );
  }

  message.channel.send(embed);
};

module.exports.help = MESSAGES.COMMANDS.INFORMATIONS.USERINFO;
