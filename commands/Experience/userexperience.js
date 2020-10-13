const { MESSAGES } = require("../../utils/constants");

module.exports.run = (bot, message, args, settings, dbUser) => {
  message.reply(`Tu possèdes ${dbUser.experience} points d'expérience`);
};

module.exports.help = MESSAGES.COMMANDS.EXPERIENCE.USEREXPERIENCE;
