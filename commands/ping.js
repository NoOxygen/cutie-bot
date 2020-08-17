exports.run = (client, message, args) => {
  message.channel.send(`Okay okay, I'm alive! This message had a latency of ${Date.now() - message.createdTimestamp}ms.`).catch(console.error);
}
