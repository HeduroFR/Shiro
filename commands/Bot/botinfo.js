const { MessageEmbed } = require("discord.js");
const { MESSAGES } = require("../../utils/constants");
const utils = require("../../json/utils.json");
const package = require("../../package.json");

module.exports.run = async (bot, message, args) => {
  const uTarget = bot;

  const gTarget = message.guild;

  const guildSize = uTarget.guilds.cache.map((g) => g).length;

  const userSize = uTarget.users.cache.map((u) => u).length;

  const devBot = uTarget.users.cache.get("279351779693428736");

  const memoryUsed =
    Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 10) / 10;

  // const shardBot = uTarget.shard.count;

  const creation = uTarget.createdAt - 3600000;

  const embed = new MessageEmbed()
    .setColor("#FEFEFE")
    .setDescription(`Voici les informations me concernant`)
    .setTitle(`Informations`)
    .addField("Serveurs", `${guildSize}`, true)
    .addField("Utilisateurs", `${userSize}`, true)
    .addField("Développeur", `${devBot.tag}`, true)
    .addField("NodeJS", `v${package.nodejs}`, true)
    .addField("Version", `v${package.version}`, true)
    .addField("Mémoire", `${memoryUsed} MB`, true)
    .addField("Shards", `1/1 Shards`, true)
    .addField(
      "Site Web",
      `[exonity.yantox.fr](https://exonity.yantox.fr)`,
      true
    )
    .setTimestamp()
    .setFooter(`${gTarget}`);

  if (devBot.avatar) {
    embed.setFooter(
      `YantoX - Développeur HTML, CSS, JS`,
      `${devBot.avatarURL()}`
    );
  }

  message.channel.send(embed);
};

module.exports.help = MESSAGES.COMMANDS.BOT.BOTINFO;
