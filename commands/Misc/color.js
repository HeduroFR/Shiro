const { MessageAttachment, MessageEmbed } = require("discord.js");
const { MESSAGES } = require("../../utils/constants");
const randomColor = require("randomcolor");
const Color = require("color-converter").default;
const Canvas = require("canvas");

module.exports.run = async (bot, message, args) => {
  const gTarget = message.guild;

  const colorHEX = randomColor();

  const canvas = Canvas.createCanvas(80, 50);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = colorHEX;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const attachment = new MessageAttachment(canvas.toBuffer(), "test.png");

  const color = Color.fromHex(colorHEX);
  const colorRGB = color.toRGB();
  const colorRed = colorRGB.r;
  const colorGreen = colorRGB.g;
  const colorBlue = colorRGB.b;
  const colorRGBString =
    "rgb(" + colorRed + ", " + colorGreen + ", " + colorBlue + ")";

  const eEmbed = new MessageEmbed()
    .setColor(colorHEX)
    .setTitle(`Couleur`)
    .setDescription(`**hex**: ${colorHEX}\n **rgb**: ${colorRGBString}`)
    .attachFiles(attachment)
    .setThumbnail("attachment://test.png")
    .setTimestamp()
    .setFooter(`${gTarget}`);

  if (gTarget.icon) {
    eEmbed.setFooter(`${gTarget}`, `${gTarget.iconURL()}`);
  }

  message.channel.send(eEmbed);
};

module.exports.help = MESSAGES.COMMANDS.MISC.COLOR;
