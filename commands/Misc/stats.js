const { MESSAGES } = require("../../utils/constants");

module.exports.run = (bot, message, args) => {
  message.guild.members.fetch().then((fetchAll) => {
    const offline = fetchAll.filter((m) => m.presence.status === "offline");
    message.channel.send(
      `Actuellement ${fetchAll.size} membres sur le serveur dont ${offline.size} hors-ligne.`
    );
  });
};

module.exports.help = MESSAGES.COMMANDS.MISC.STATS;
