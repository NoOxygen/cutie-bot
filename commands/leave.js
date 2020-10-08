exports.run = (client, message) => {
  const queue = message.client.queue.get(message.guild.id);
	if (!queue) return;
  queue.channel.leave();
  message.client.queue.delete(message.guild.id);
}
