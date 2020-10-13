const { Client, Collection } = require("discord.js");
const { loadCommands, loadEvents } = require("./utils/loader");

const bot = new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
require("./utils/functions")(bot);
bot.config = require("./config");
bot.mongoose = require("./utils/mongoose");
["commands", "cooldowns"].forEach((x) => (bot[x] = new Collection()));

loadCommands(bot);
loadEvents(bot);
bot.mongoose.init();

bot.login(bot.config.TOKEN);
