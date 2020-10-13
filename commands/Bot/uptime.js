const { MessageEmbed } = require("discord.js");
const { MESSAGES } = require("../../utils/constants");

module.exports.run = async (bot, message, args) => {
  const gTarget = message.guild;
  const uTarget = message.author;

  const uptimeMS = bot.uptime;

  console.log(uptimeMS);

  const uptimeBot = bot.duration(uptimeMS);

  const embed = new MessageEmbed()
    .setColor("#FEFEFE")
    .setTitle(`**Uptime**`)
    .addField("Je suis actif depuis", `**${uptimeBot}**`, true)
    .setTimestamp()
    .setFooter(`${gTarget}`);

  if (gTarget.icon) {
    embed.setFooter(`${gTarget}`, `${gTarget.iconURL()}`);
  }

  message.channel.send(embed);
};

module.exports.help = MESSAGES.COMMANDS.BOT.UPTIME;
