exports.run = (client, message) => {
  const { canModifyQueue } = require("../util/CutieUtil");
  const queue = message.client.queue.get(message.guild.id);
  if (!queue)
    return message.reply("There is nothing playing that I could skip for you.").catch(console.error);
  if (!canModifyQueue(message.member)) return;

  queue.playing = true;
  queue.connection.dispatcher.end();
  queue.textChannel.send(`${message.author} ⏭ skipped the song`).catch(console.error);
}
