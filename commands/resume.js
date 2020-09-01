exports.run = (client, message) => {
  const { canModifyQueue } = require("../util/CutieUtil");
  const queue = message.client.queue.get(message.guild.id);
  if (!queue) return message.channel.send("There is nothing playing.").catch(console.error);
  if (!canModifyQueue(message.member)) return;

  if (!queue.playing) {
    queue.playing = true;
    queue.connection.dispatcher.resume();
    return queue.textChannel.send(`${message.author.username} resumed the music!`).catch(console.error);
  }

  return message.channel.send("The queue is not paused.").catch(console.error);
}
