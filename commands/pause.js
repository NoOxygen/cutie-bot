exports.run = (client, message) => {
  const { canModifyQueue } = require("../util/CutieUtil");
	const { MessageEmbed } = require("discord.js");
  const queue = message.client.queue.get(message.guild.id);

	const errorEmbed = new MessageEmbed()
		.setColor(0xffd1dc)
		.setDescription("There is nothing playing")

  if (!queue) return message.channel.send(errorEmbed).catch(console.error);
  if (!canModifyQueue(message.member)) return;

  if (queue.playing) {
    queue.playing = false;
    queue.connection.dispatcher.pause(true);
		const pauseEmbed = new MessageEmbed()
			.setColor(0xffd1dc)
			.setDescription(`${message.author.username} paused the music.`)
    return queue.textChannel.send(pauseEmbed).catch(console.error);
  }
}
