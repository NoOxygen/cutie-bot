exports.run = (client, message) => {
  const { canModifyQueue } = require("../util/CutieUtil");
  const { Client, MessageEmbed } = require('discord.js');
  const queue = message.client.queue.get(message.guild.id);

  const errorEmbed = new MessageEmbed()
    .setColor(0xffd1dc)
    .setDescription("There is nothing playing")

  if (!queue) return message.channel.send(errorEmbed).catch(console.error);
  if (!canModifyQueue(message.member)) return;

  if (!queue.playing) {
    const resumeEmbed = new MessageEmbed()
      .setColor(0xffd1dc)
      .setDescription(`${message.author.username} resumed the music!`)
    queue.playing = true;
    queue.connection.dispatcher.resume();
    return queue.textChannel.send(resumeEmbed).catch(console.error);
  }

  const bruhWTF = new MessageEmbed()
    .setColor(0xffd1dc)
    .setDescription("The queue is not paused.")

  return message.channel.send(bruhWTF).catch(console.error);
}
