const { MESSAGES } = require("../../utils/constants");
const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const anime = await fetch(
    "https://www.reddit.com/user/emdix/m/animemes/top/.json?sort=top&t=day&limit=500"
  )
    .then((res) => res.json())
    .then((json) => json.data.children);

  const img = anime[Math.floor(Math.random() * anime.length)].data;

  const embed = new MessageEmbed()
    .setDescription(img.title)
    .setImage(img.url)
    .setFooter("Powered by r/animemes");

  message.channel.send(embed);
};

module.exports.help = MESSAGES.COMMANDS.FUN.ANIME;
