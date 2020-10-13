module.exports = async (bot) => {
  const myGuild = await bot.guilds.cache.get("674177789208821782");

  console.log(`${bot.user.username} est connecté !`);

  const presenceActivityList = ["!help", "Dev - YantoX"];

  const presenceTypeList = ["WATCHING", "PLAYING", "LISTENING"];

  setInterval(() => {
    const indexA = Math.floor(
      Math.random() * (presenceActivityList.length - 1) + 1
    ); // generates a random number between 1 and the length of the activities array list (in this case 5).
    const indexB = Math.floor(
      Math.random() * (presenceActivityList.length - 1) + 1
    ); // generates a random number between 1 and the length of the activities array list (in this case 5).

    bot.user.setPresence({
      activity: {
        name: presenceActivityList[indexA],
        type: presenceTypeList[indexB],
      },
      status: "dnd",
    });
  }, 10000);
};
