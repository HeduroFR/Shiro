const { MESSAGES } = require("../../utils/constants");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let invites = await message.guild.fetchInvites();
  invites = invites.array();

  if (!message.member.hasPermission("ADMINISTRATOR")) {
    const permissionEmbed = new MessageEmbed()
      .setTitle("Une erreur est survenue")
      .setDescription(
        `● Vous ne disposez pas des permissions suffisantes : ADMINISTRATOR`
      )
      .setColor("#b30000")
      .setTimestamp()
      .setFooter("Erreur", `${bot.user.avatarURL()}`);

    message.channel.send(permissionEmbed);
  } else {
    if (invites.length === 0) {
      let invitePerma = await message.channel.createInvite({
        maxAge: 0,
        maxUses: 0,
      });

      const invitePermaEmbed = new MessageEmbed()
        .setTitle("Invitation créé")
        .setDescription(
          `● Le serveur ne dispose d'aucunes invitations \n ● Voilà votre nouvelle invitation : ${invitePerma.url}`
        )
        .setColor("#095228")
        .setTimestamp()
        .setFooter("Erreur", `${bot.user.avatarURL()}`);

      message.channel.send(invitePermaEmbed);
    } else {
      const permaOneEmbed = new MessageEmbed()
        .setTitle("Invitation trouvée")
        .setDescription(
          `● Le serveur dispose déjà d'une invitation permanente \n ${invites[0].url}`
        )
        .setColor("#b30000")
        .setTimestamp()
        .setFooter("Erreur", `${bot.user.avatarURL()}`);

      message.channel.send(permaOneEmbed);
    }
  }
};

module.exports.help = MESSAGES.COMMANDS.ADMIN.PERMA;
