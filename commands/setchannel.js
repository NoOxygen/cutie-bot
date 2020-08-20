exports.run = (client, message) => {
  const { Client, MessageEmbed } = require('discord.js');

  if(!message.member.hasPermission('ADMINISTRATOR'))
    return message.reply("you can't use this command.");

  const setChannel = `${client.config.prefix} anon ${message.channel.id} [message]`
  const embed = new MessageEmbed()
    .setColor(0xffd1dc)
    .setDescription(`Anonymous channel set to <#${message.channel.id}>. DM me a message like this:` + `

${setChannel}`)
  message.channel.send(embed)
}
