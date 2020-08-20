exports.run = (client, message) => {
  const modRole = message.guild.roles.cache.find(role => role.name === "staff");
  const { Client, MessageEmbed } = require('discord.js');
  if (!modRole)
    return console.log("The staff role does not exist");

  if (!message.member.roles.cache.has(modRole.id))
    return message.reply("you can't use this command.");

  const setChannel = `qt anon ${message.channel.id} [message]`
  const embed = new MessageEmbed()
    .setColor(0xffd1dc)
    .setDescription(`Anonymous channel set to <#${message.channel.id}>. DM me a message like this:` + `

${setChannel}`)
  message.channel.send(embed)
}
