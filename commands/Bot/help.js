const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const { MESSAGES } = require("../../utils/constants");
const categoryList = readdirSync("./commands");

module.exports.run = (bot, message, args, settings) => {
  if (!args.length) {
    const embed = new MessageEmbed()
      .setColor("#36393F")
      .addField(
        "Liste des commandes",
        `Une liste de toutes les sous-catégories disponibles et leurs commandes.\nPour plus d'informations sur une commande, tapez \`${settings.prefix}help <command_name>\`.`
      );

    for (const category of categoryList) {
      embed.addField(
        `${category}`,
        `${bot.commands
          .filter((cat) => cat.help.category === category.toLowerCase())
          .map((cmd) => cmd.help.name)
          .join(", ")}`
      );
    }

    return message.channel.send(embed);
  } else {
    const command =
      bot.commands.get(args[0]) ||
      bot.commands.find(
        (cmd) => cmd.help.aliases && cmd.help.aliases.includes(args[0])
      );

    const embed = new MessageEmbed()
      .setColor("#36393F")
      .setTitle(`\`${command.help.name}\``)
      .addField("Description", `${command.help.description}`)
      .addField("Cooldown", `${command.help.cooldown} secondes`)
      .addField(
        "Utilisation",
        command.help.usage
          ? `${settings.prefix}${command.help.name} ${command.help.usage}`
          : `${settings.prefix}${command.help.name}`,
        true
      );

    if (command.help.aliases.length > 1)
      embed.addField("Alias", `${command.help.aliases.join(", ")}`, true);

    return message.channel.send(embed);
  }
};

module.exports.help = MESSAGES.COMMANDS.BOT.HELP;
