exports.run = (client, message) => {
  const { canModifyQueue } = require("../util/CutieUtil");
  const queue = message.client.queue.get(message.guild.id);
  if (!queue) return message.send("There is nothing playing.").catch(console.error);
  if (!canModifyQueue(message.member)) return;

  if (queue.playing) {
    queue.playing = false;
    queue.connection.dispatcher.pause(true);
    return queue.textChannel.send(`${message.author.username} paused the music.`).catch(console.error);
  }
}
