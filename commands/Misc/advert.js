const { MESSAGES } = require("../../utils/constants");
const { MessageEmbed } = require("discord.js");

module.exports.run = (bot, message, args) => {
  const embed = new MessageEmbed().setColor("#ffad1b").setTimestamp();

  switch (args[0]) {
    case "fr":
      const msgContentFR = args;
      const channelAdvertFR = bot.channels.cache.get("720708941754925168");
      msgContentFR.shift();

      embed
        .setTitle("⚠️ Annonce ⚠️")
        .setDescription(msgContentFR.join(" "))
        .setFooter("Annonce", `${bot.user.avatarURL()}`);

      const embedSuccesFR = new MessageEmbed()
        .setTitle("Succès")
        .setDescription(`● L'annonce en FR a bien été envoyé`)
        .setColor("#095228")
        .setTimestamp()
        .setFooter("Succès", `${bot.user.avatarURL()}`);

      message.channel.send(embedSuccesFR);
      channelAdvertFR.send(embed);    
      break;

    case "en":
      const msgContentEN = args;
      const channelAdvertEN = bot.channels.cache.get("720708965591416903");
      msgContentEN.shift();

      embed
        .setTitle("⚠️ Advert ⚠️")
        .setDescription(msgContentEN.join(" "))
        .setFooter("Advert", `${bot.user.avatarURL()}`);

      const embedSuccesEN = new MessageEmbed()
        .setTitle("Succès")
        .setDescription(`● L'annonce en EN a bien été envoyé`)
        .setColor("#095228")
        .setTimestamp()
        .setFooter("Succès", `${bot.user.avatarURL()}`);

      message.channel.send(embedSuccesEN);
      channelAdvertEN.send(embed);
      break;
  }
};

module.exports.help = MESSAGES.COMMANDS.MISC.ADVERT;
