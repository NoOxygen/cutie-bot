exports.run = (client, message, args) => {
  const { canModifyQueue } = require("../util/CutieUtil");
  const { Client, MessageEmbed } = require('discord.js');

  const errorEmbed = new MessageEmbed()
    .setColor(0xffd1dc)
    .setDescription(`Skip to whaaattt`)
  const whereQ = new MessageEmbed()
    .setColor(0xffd1dc)
    .setDescription(`There is no queue`)
  const tooFarEmbed = new MessageEmbed()
    .setColor(0xffd1dc)
    .setDescription(`The queue is only ${queue.songs.length} songs long!`)

  if (!args.length)
    return messagesend
      .send(errorEmbed)
      .catch(console.error);

  if (isNaN(args[0]))
    return message
      .send(errorEmbed)
      .catch(console.error);

  const queue = message.client.queue.get(message.guild.id);
  if (!queue) return message.channel.send(whereQ).catch(console.error);
  if (!canModifyQueue(message.member)) return;

  if (args[0] > queue.songs.length)
    return message.channel.send(tooFarEmbed).catch(console.error);

  queue.playing = true;
  if (queue.loop) {
    for (let i = 0; i < args[0] - 2; i++) {
      queue.songs.push(queue.songs.shift());
    }
  } else {
    queue.songs = queue.songs.slice(args[0] - 2);
  }
  queue.connection.dispatcher.end();
  const skipEmbed = new MessageEmbed()
    .setColor(0xffd1dc)
    .setDescription(`${message.author.username} skipped ${args[0] - 1} songs`)
  queue.textChannel.send(skipEmbed).catch(console.error);
}
