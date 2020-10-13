const { MessageEmbed, Collection } = require("discord.js");

module.exports = async (bot, message) => {
  if (message.channel.type === "dm") return;

  const settings = await bot.getGuild(message.guild);
  const dbUser = await bot.getUser(message.member);

  const pubRole = message.guild.roles.cache.get("722558627407462401");

  if (message.author.bot) return;

  if (!dbUser) {
    await bot.createUser({
      guildID: message.member.guild.id,
      guildName: message.member.guild.name,
      userID: message.member.id,
      username: message.member.user.tag,
    });
  }

  const expCd = Math.floor(Math.random() * 19) + 1;
  const expToAdd = Math.floor(Math.random() * 25) + 10;

  if (expCd >= 8 && expCd <= 11 && !message.content.startsWith(settings.prefix))
    await bot.addExp(bot, message.member, expToAdd);

  const userLevel = Math.floor(0.1 * Math.sqrt(dbUser.experience));

  if (dbUser.level < userLevel) {
    message.reply(`Bravo à toi, tu viens de monter niveau ***${userLevel}***`);
    bot.updateUser(message.member, { level: userLevel });
  }

  if (message.author.id !== ("279351779693428736" || "393654969984876554")) {
    let discordInvite = /(https:\/\/)?(www\.)?(discord\.gg|discord\.me|discordapp\.com\/invite|discord\.com\/invite)\/([a-z0-9-.]+)?/i;
    if (discordInvite.test(message.content)) {
      await message.delete();
      const embed = new MessageEmbed()
        .setTitle("Action interdite")
        .setDescription(
          `● Vous n'êtes pas autorisé à envoyer une invitation \n ● Si vous pensez que c'est une erreur \n ● Veuillez nous contacter en passant par les Tickets`
        )
        .setColor("#b30000")
        .setTimestamp()
        .setFooter("Erreur", `${bot.user.avatarURL()}`);

      message.author.send(embed);
    }
  }

  if (!message.content.startsWith(settings.prefix)) return;

  // Constantes
  const args = message.content.slice(settings.prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  const user = message.mentions.users.first();

  const command =
    bot.commands.get(commandName) ||
    bot.commands.find(
      (cmd) => cmd.help.aliases && cmd.help.aliases.includes(commandName)
    );
  if (!command) return;

  // Vérification des permissions
  if (command.help.permissions && !message.member.hasPermission("BAN_MEMBERS"))
    return message.reply("Tu n'as pas les permissions pour cette commande.");

  // Vérification des arguments
  if (command.help.args && !args.length) {
    // let noArgsReply = `La commande exige des arguments, ${message.author}`;
    const noArgsEmbed = new MessageEmbed()
      .setTitle("Une erreur est survenue")
      .setColor("#b30000")
      .setTimestamp()
      .setFooter("Erreur", `${bot.user.avatarURL()}`);
    if (command.help.usage)
      noArgsEmbed.setDescription(
        `● Vous devez choisir une option pour utiliser cette commande \n ● \`${settings.prefix}${command.help.name} ${command.help.usage}\``
      );
    message.channel.send(noArgsEmbed);
  }

  // Vérification si mention user
  if (command.help.isUserAdmin && !user)
    return message.reply("Il faut mentionner un utilisateur.");

  // Vérification des permissions sur utilisateur
  if (
    command.help.isUserAdmin &&
    message.guild.member(user).hasPermission("BAN_MEMBERS")
  ) {
    message.reply(
      "Tu ne peux pas effectuer cette commande sur cet utilisateur."
    );
  }

  // Cooldown
  if (message.author.id !== "279351779693428736") {
    if (!bot.cooldowns.has(command.help.name)) {
      bot.cooldowns.set(command.help.name, new Collection());
    }

    const timeNow = Date.now();
    const tStamps = bot.cooldowns.get(command.help.name);
    const cdAmount = (command.help.cooldown || 5) * 1000;

    if (tStamps.has(message.author.id)) {
      const cdExpirationTime = tStamps.get(message.author.id) + cdAmount;

      if (timeNow < cdExpirationTime) {
        timeLeft = (cdExpirationTime - timeNow) / 1000;
        return message.reply(
          `Merci d'attendre ${timeLeft.toFixed(
            0
          )} seconde(s) anvant de ré-utiliser la commande \`${
            command.help.name
          }\`.`
        );
      }
    }

    tStamps.set(message.author.id, timeNow);
    setTimeout(() => tStamps.delete(message.author.id), cdAmount);

    tStamps.set(message.author.id, timeNow);
    // Fin cooldown
  }

  command.run(bot, message, args, settings, dbUser);
};
