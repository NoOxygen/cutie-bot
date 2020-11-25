exports.run = (client, message) => {
  const { canModifyQueue } = require("../util/CutieUtil");
	const { play } = require("../include/play");
  const { Client, MessageEmbed } = require('discord.js');

  const queue = message.client.queue.get(message.guild.id);
  const errorEmbed = new MessageEmbed()
    .setColor(0xffd1dc)
    .setDescription("There is nothing that I could go back to for you.")

  if (client.past.length === 0)
    return message.channel.send(errorEmbed).catch(console.error);
  if (!canModifyQueue(message.member)) return;

  queue.playing = true;
	queue.songs.unshift(client.past[client.past.length - 1]);
	client.past.pop();
  play(queue.songs[0], message);
}
