const { MessageEmbed } = require("discord.js");
const { MESSAGES } = require("../../utils/constants");

module.exports.run = async (bot, message, args) => {
  let user = message.guild.member(message.mentions.users.first());
  if (isNaN(args[1]) || args[1] < 1 || args[1] > 100)
    return message.reply("Il faut spécifier un ***nombre*** entre 1 et 100.");

  const messages = (
    await message.channel.messages.fetch({
      limit: 100,
      before: message.id,
    })
  )
    .filter((a) => a.author.id === user.id)
    .array();

  messages.length = Math.min(args[1], messages.length);

  if (messages.length === 0 || !user)
    return message.reply(
      "Aucun message à supprimer sur cet utilisteur __ou__ Cet utilisateur n'existe pas"
    );

  if (messages.length === 1) await messages[0].delete;
  else await message.channel.bulkDelete(messages);

  const embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.avatarURL())
    .setColor("##dc143c")
    .setDescription(
      `**Action**: Prune\n**Nbr de messages**: ${args[1]}\n**Utilisateur**: ${args[0]}`
    );

  bot.channels.cache.get("722559340933808148").send(embed);
};

module.exports.help = MESSAGES.COMMANDS.MODERATION.PRUNE;
