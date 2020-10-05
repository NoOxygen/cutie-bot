exports.run = (client, message) => {
  const { canModifyQueue } = require("../util/CutieUtil");
	const { Client, MessageEmbed } = require('discord.js');

	const errorEmbed = new MessageEmbed()
		.setColor(0xffd1dc)
		.setDescription("There is nothing playing that I could skip for you.")

  const queue = message.client.queue.get(message.guild.id);
  if (!queue)
    return message.channel.send(errorEmbed).catch(console.error);
  if (!canModifyQueue(message.member)) return;

  queue.playing = true;
  queue.connection.dispatcher.end();
	const skipEmbed = new MessageEmbed()
		.setColor(0xffd1dc)
		.setDescription(`${message.author.username} skipped the song`)
  queue.textChannel.send(skipEmbed).catch(console.error);
}
