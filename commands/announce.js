exports.run = (client, message, [param, ...announcement]) => {
  const { Client, MessageEmbed } = require('discord.js');
  const moment = require("moment-timezone");
  actionDate = moment(message.createdTimestamp).format('hh:mm DD/MM/YYYY')

  if(!message.member.hasPermission('ADMINISTRATOR'))
    return message.reply("you can't use this command.");

  if (param === "everyone"){
    let channel = message.mentions.channels.first();
    var announce = announcement.join(" ")
    var space = announce.indexOf(' ')
    var msg = announce.slice(space, announce.length)
    const embed = new MessageEmbed()
      .setColor(0xffd1dc)
      .setDescription(`${msg}`)
      .setFooter(`${actionDate}`)

    message.guild.channels.cache.get(channel.id).send(`@everyone`, embed)
  } else {
    const embed = new MessageEmbed()
      .setColor(0xffd1dc)
      .setDescription(`${announcement.join(" ")}`)
      .setFooter(`${actionDate}`)
    let channel = message.mentions.channels.first();
    message.guild.channels.cache.get(channel.id).send(embed)
  }
}
