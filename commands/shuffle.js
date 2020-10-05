exports.run = (client, message) => {
  const { canModifyQueue } = require("../util/CutieUtil");
  const queue = message.client.queue.get(message.guild.id);
	const { Client, MessageEmbed } = require('discord.js');

	const whereQ = new MessageEmbed()
		.setColor(0xffd1dc)
		.setDescription(`There is no queue`)

	const shuffleEmbed = new MessageEmbed()
		.setColor(0xffd1dc)
		.setDescription(`${message.author.username} shuffled the queue`)

  if (!queue) return message.channel.send(whereQ).catch(console.error);
  if (!canModifyQueue(message.member)) return;

  let songs = queue.songs;
  for (let i = songs.length - 1; i > 1; i--) {
    let j = 1 + Math.floor(Math.random() * i);
    [songs[i], songs[j]] = [songs[j], songs[i]];
  }
  queue.songs = songs;
  message.client.queue.set(message.guild.id, queue);
  queue.textChannel.send(shuffleEmbed).catch(console.error);
}
