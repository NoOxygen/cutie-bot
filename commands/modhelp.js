exports.run = (client, message, [mention, ...reason]) => {
  const { Client, MessageEmbed } = require('discord.js');
  if (!message.member.roles.cache.some(r=>["staff", "aide", "admin"].includes(r.name)))
    return message.reply("You can't use this command.");

  const header = `This bot is a homebrew bot and is being made by one (1) person as a community project/hobby. Support for the bot is NOT guaranteed.

Its current prefix is "qt"

***Current Command List:***`

  const embed = new MessageEmbed()
    .setTitle("**__CUTIE__**")
    .setColor(0xffd1dc)
    .setDescription(`
      ${header}

      **kick**
      **ban**
      **mute**
      **unmute**

      I believe these commands are pretty self explanatory :)
      `);
    message.channel.send(embed);
}
