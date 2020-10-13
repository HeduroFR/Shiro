const { MESSAGES } = require("../../utils/constants");

module.exports.run = (bot, message, args) => {
  const filter = (reaction) => reaction.emoji.name === "⭐";
  const collector = message.createReactionCollector(filter, { time: 10000 });

  collector.on("end", (collected) => {
    message.channel.send(`${collected.size} réactions collectée.`);
  });
};

module.exports.help = MESSAGES.COMMANDS.COLLECTORS.REACTCOLLECTOR;
