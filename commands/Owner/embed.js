const { MessageEmbed } = require("discord.js");
const { MESSAGES } = require("../../utils/constants");

module.exports.run = async (bot, message, args) => {
  const frFlag = bot.emojis.cache.find(
    (emoji) => emoji.id === "722560301320372316"
  );

  const enFlag = bot.emojis.cache.find(
    (emoji) => emoji.id === "722560288108314667"
  );

  const checkmarkEmoji = bot.emojis.cache.find(
    (emoji) => emoji.id === "722909406626578483"
  );

  const embed = new MessageEmbed()
    .setTitle(
      `${checkmarkEmoji} Règlement`
    )
    .setDescription(
      `Si vous êtes **Français**, veuillez choisir la réaction : ${frFlag}\n\nIf you are **English**, please select the reaction : ${enFlag}`
    );

  message.channel.send(embed);
};

module.exports.help = MESSAGES.COMMANDS.OWNER.EMBED;
