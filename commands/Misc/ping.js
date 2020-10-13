const { MESSAGES } = require("../../utils/constants");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const gTarget = message.guild;
  const loadingEmoji = gTarget.emojis.cache.get("723306529947910184");

  const embedBefore = new MessageEmbed()
    .setColor("#FEFEFE")
    .setTitle(`**Latence**`)
    .addField("Latence du bot :", `${loadingEmoji}`, true)
    .addField("Latence de l'API :", `${loadingEmoji}`, true)
    .setTimestamp()
    .setFooter(`${gTarget}`);

  if (gTarget.icon) {
    embedBefore.setFooter(`${gTarget}`, `${gTarget.iconURL()}`);
  }

  const msg = await message.channel.send(embedBefore);

  const embedAfter = new MessageEmbed()
    .setColor("#FEFEFE")
    .setTitle(`**Latence**`)
    .addField(
      "Latence du bot :",
      `**${msg.createdTimestamp - message.createdTimestamp}**ms`,
      true
    )
    .addField("Latence de l'API :", `**${Math.round(bot.ws.ping)}**ms`, true)
    .setTimestamp()
    .setFooter(`${gTarget}`);

  if (gTarget.icon) {
    embedAfter.setFooter(`${gTarget}`, `${gTarget.iconURL()}`);
  }

  setTimeout(() => {
    msg.edit(embedAfter);
  }, 500);
};

module.exports.help = MESSAGES.COMMANDS.MISC.PING;
