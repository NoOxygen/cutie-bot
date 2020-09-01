exports.run = (client, message) => {
  const queue = message.client.queue.get(message.guild.id);
  queue.channel.leave();
  message.client.queue.delete(message.guild.id);
}
