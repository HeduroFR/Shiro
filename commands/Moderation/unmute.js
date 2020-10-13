const { MessageEmbed } = require("discord.js");
const { MESSAGES } = require("../../utils/constants");

module.exports.run = (bot, message, args) => {
  const user = message.guild.member(message.mentions.users.first());
  let muteRole = message.guild.roles.cache.find((r) => r.name === "muted");
  let muteTime = args[1] || "60s";

  if (!user.roles.cache.has(muteRole.id))
    return message.reply("L'utilisateur mentionné n'est pas mute");

  user.roles.remove(muteRole.id);
  message.channel.send(`<@${user.id}> est unmute.`);

  const embed = new MessageEmbed()
    .setAuthor(`${user.user.username} (${user.id})`)
    .setColor("#cc9ff0")
    .setDescription(`**Action**: Unmute\n**Temps**: ${ms(ms(muteTime))}`)
    .setTimestamp()
    .setFooter(message.author.username, message.author.avatarURL());

  if (user.user.avatar) {
    embed.setThumbnail(user.user.avatarURL());
  }

  bot.channels.cache.get("722559340933808148").send(embed);
};

module.exports.help = MESSAGES.COMMANDS.MODERATION.UNMUTE;
