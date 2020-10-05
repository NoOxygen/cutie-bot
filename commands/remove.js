exports.run = (client, message, args) => {
  const { canModifyQueue } = require("../util/CutieUtil");
  const { Client, MessageEmbed } = require('discord.js');

  const whereQ = new MessageEmbed()
    .setColor(0xffd1dc)
    .setDescription(`There is no queue`)

  const boof = new MessageEmbed()
    .setColor(0xffd1dc)
    .setDescription(`${message.author.username} removed **${song[0].title}** from the queue.`)

  const queue = message.client.queue.get(message.guild.id);
  if (!queue) return message.channel.send(whereQ).catch(console.error);
  if (!canModifyQueue(message.member)) return;

  if (!args.length) return message.channel.send(`Usage: ${message.client.prefix}remove <Queue Number>`);
  if (isNaN(args[0])) return message.channel.send(`Usage: ${message.client.prefix}remove <Queue Number>`);

  const song = queue.songs.splice(args[0] - 1, 1);
  queue.textChannel.send(boof);
}
