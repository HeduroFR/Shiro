const { MESSAGES } = require("../../utils/constants");
const { MessageEmbed } = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let invites = await message.guild.fetchInvites();
  invites = invites.array();

  switch (args[0]) {
    case "deleteall":
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
          const noInvitesEmbed = new MessageEmbed()
            .setTitle("Invites")
            .setDescription(`● Le serveur ne dispose d'aucunes invitations`)
            .setColor("#b30000")
            .setTimestamp()
            .setFooter("Erreur", `${bot.user.avatarURL()}`);

          message.channel.send(noInvitesEmbed);
        } else {
          invites.forEach((i) => {
            i.delete();
          });
          const inviteDeleteEmbed = new MessageEmbed()
            .setTitle("Invites")
            .setDescription(
              `● Toutes les invitations du serveur ont bien été supprimées`
            )
            .setColor("#095228")
            .setTimestamp()
            .setFooter("Succès", `${bot.user.avatarURL()}`);
          message.channel.send(inviteDeleteEmbed);
        }
      }
      break;
    case "view":
      if (invites.length === 0) {
        const noInvitesEmbed = new MessageEmbed()
          .setTitle("Une erreur est survenue")
          .setDescription(`● Le serveur ne dispose d'aucunes invitations`)
          .setColor("#b30000")
          .setTimestamp()
          .setFooter("Erreur", `${bot.user.avatarURL()}`);

        message.channel.send(noInvitesEmbed);
      } else {
        const invitesEmbed = new MessageEmbed()
          .setTitle("Invitations du serveur")
          .setDescription(
            `● Le serveur dispose de ${invites.length} invitations \n ● Voilà la première invitation du serveur : \n - ${invites[0].url}`
          )
          .setColor("#ffe436")
          .setTimestamp()
          .setFooter("Erreur", `${bot.user.avatarURL()}`);

        message.channel.send(invitesEmbed);
      }
      break;
    default:
      break;
  }
};

module.exports.help = MESSAGES.COMMANDS.MISC.INVITE;
