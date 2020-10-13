const { MessageEmbed } = require("discord.js");
const { MESSAGES } = require("../../utils/constants");

module.exports.run = async (bot, message, args) => {
  if (isNaN(args[0]) || args[0] < 1 || args[0] > 100)
    return message.reply("Il faut spécifier un ***nombre*** entre 1 et 100.");

  const messages = await message.channel.messages.fetch({
    limit: Math.min(args[0], 100),
    before: message.id,
  });

  message.delete();
  await message.channel.bulkDelete(messages);

  const embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL())
    .setColor("##dc143c")
    .setDescription(
      `**Action**: Purge\n**Nbr de messages**: ${args[0]}\n**Salon**: ${message.channel}`
    );

  bot.channels.cache.get("722559340933808148").send(embed);
};

module.exports.help = MESSAGES.COMMANDS.MODERATION.PURGE;
