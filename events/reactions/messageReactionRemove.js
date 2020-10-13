module.exports = async (bot, messageReaction, user) => {
  const message = messageReaction.message;
  const member = message.guild.members.cache.get(user.id);
  const emoji = messageReaction.emoji;

  const validateRole = message.guild.roles.cache.get("720069157781241896");
  const enRole = message.guild.roles.cache.get("674716668072689709");
  const frRole = message.guild.roles.cache.get("674716592889790474");

  if (member.user.bot) return;

  if (messageReaction.partial) {
    await messageReaction.fetch();
    return;
  }

  if (emoji.name === "✅") member.roles.remove(validateRole);

  if (emoji.id === "722560288108314667") member.roles.remove(enRole);
  if (emoji.id === "722560301320372316") member.roles.remove(frRole);
};
