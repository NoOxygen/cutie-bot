exports.run = (client, message, args) => {
  const { Client, MessageEmbed } = require('discord.js');

  if(!message.member.hasPermission('ADMINISTRATOR'))
    return message.reply("you can't use this command.");

  let channel = message.mentions.channels.first();
  let confessChnl = channel.id;
  if(!channel) return message.reply("Usage: `anon-setup #channel`");

  const key = `${message.guild.id}`
  // Triggers on new servers we haven't seen before.
  client.confess.ensure(`${message.guild.id}`, {
    guild: message.guild.id,
    anonChnl: `${confessChnl}`
  });

  client.confess.set(key, confessChnl, "anonChnl");

  const setChannel = `${client.config.prefix} anon ${key} [message]`
  const embed = new MessageEmbed()
    .setColor(0xffd1dc)
    .setDescription(`Anonymous channel set to <#${channel.id}>. DM me a message like this:` + `

${setChannel}`)
  message.channel.send(embed)
}
