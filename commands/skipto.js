exports.run = (client, message, args) => {
  const { canModifyQueue } = require("../util/CutieUtil");

  if (!args.length)
    return messagesend
      .send(`Skip to whaaattt`)
      .catch(console.error);

  if (isNaN(args[0]))
    return message
      .send(`Skip to whaaattt`)
      .catch(console.error);

  const queue = message.client.queue.get(message.guild.id);
  if (!queue) return message.channel.send("There is no queue.").catch(console.error);
  if (!canModifyQueue(message.member)) return;

  if (args[0] > queue.songs.length)
    return message.channel.send(`The queue is only ${queue.songs.length} songs long!`).catch(console.error);

  queue.playing = true;
  if (queue.loop) {
    for (let i = 0; i < args[0] - 2; i++) {
      queue.songs.push(queue.songs.shift());
    }
  } else {
    queue.songs = queue.songs.slice(args[0] - 2);
  }
  queue.connection.dispatcher.end();
  queue.textChannel.send(`${message.author.username} skipped ${args[0] - 1} songs`).catch(console.error);
}
