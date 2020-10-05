exports.run = (client, message) => {
  const { Client, MessageEmbed } = require('discord.js');
  const { canModifyQueue } = require("../util/CutieUtil");

  const queue = message.client.queue.get(message.guild.id);

  if (!queue) return message.channel.send("There is nothing playing.").catch(console.error);
  if (!canModifyQueue(message.member)) return;

  queue.songs = [];
  queue.connection.dispatcher.end();
  const stopEmbed = new MessageEmbed()
    .setColor(0xffd1dc)
    .setDescription(`${user.username} stopped the music!`)
  queue.textChannel.send(stopEmbed).catch(console.error);
}
