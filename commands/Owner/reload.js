const { MESSAGES } = require("../../utils/constants");

module.exports.run = async (bot, message, args) => {
  await message.delete();
  await bot.channels.cache.get("722559340933808148").send("Le bot redémarre.");
  process.exit();
};

module.exports.help = MESSAGES.COMMANDS.OWNER.RELOAD;
