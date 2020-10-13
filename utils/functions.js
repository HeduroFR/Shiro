const mongoose = require("mongoose");
const { Guild, User } = require("../models/index");

module.exports = async (bot) => {
  bot.createGuild = async (guild) => {
    const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, guild);
    const createGuild = await new Guild(merged);
    createGuild
      .save()
      .then((g) => console.log(`Nouveau serveur -> ${g.guildName}`));
  };

  bot.getGuild = async (guild) => {
    const data = await Guild.findOne({ guildID: guild.id });
    if (data) return data;
    return bot.config.DEFAULTSETTINGS;
  };

  bot.updateGuild = async (guild, settings) => {
    let data = await bot.getGuild(guild);
    if (typeof data !== "object") data = {};
    for (const key in settings) {
      if (data[key] !== settings[key]) data[key] = settings[key];
    }
    return data.updateOne(settings);
  };

  bot.createUser = async (user) => {
    const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, user);
    const createUser = await new User(merged);
    createUser
      .save()
      .then((u) => console.log(`Nouvel utilisateur -> ${u.username}`));
  };

  bot.getUser = async (user) => {
    const data = await User.findOne({ userID: user.id });
    if (data) return data;
    else return;
  };

  bot.getUsers = async (guild) => {
    const data = await User.findOne({ guildID: guild.id });
    if (data) return data;
    else return;
  };

  bot.updateUser = async (user, settings) => {
    let data = await bot.getUser(user);
    if (typeof data !== "object") data = {};
    for (const key in settings) {
      if (data[key] !== settings[key]) data[key] = settings[key];
    }
    return data.updateOne(settings);
  };

  bot.addExp = async (bot, member, exp) => {
    const userToUpdate = await bot.getUser(member);
    const updateExp = userToUpdate.experience + exp;
    await bot.updateUser(member, { experience: updateExp });
  };

  bot.removeExp = async (bot, member, exp) => {
    const userToUpdate = await bot.getUser(member);
    const updateExp = userToUpdate.experience - exp;
    await bot.updateUser(member, { experience: updateExp });
  };

  bot.duration = (ms) => {
    const sec = Math.floor((ms / 1000) % 60).toString();
    const min = Math.floor((ms / (1000 * 60)) % 60).toString();
    const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
    const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();
    return `${days} jours, ${hrs} heures, ${min} minutes, ${sec} secondes`;
  };

  bot.structure = (a) => {
    return (a + "").charAt(0).toUpperCase() + a.substr(1);
  };
};
