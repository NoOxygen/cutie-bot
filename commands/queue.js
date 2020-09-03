exports.run = (client, message) => {
  const { MessageEmbed, splitMessage, escapeMarkdown } = require("discord.js");
  const queue = message.client.queue.get(message.guild.id);
  if (!queue) return message.channel.send("There is nothing playing.").catch(console.error);

  const description = queue.songs.map((song, index) => `${index + 1}. ${escapeMarkdown(song.title)}`);

  let queueEmbed = new MessageEmbed()
    .setTitle("Cutie Music Queue")
    .setDescription(description)
    .setColor("0xffd1dc");

  const splitDescription = splitMessage(description, {
    maxLength: 2048,
    char: "\n",
    prepend: "",
    append: ""
  });

  splitDescription.forEach(async (m) => {
    queueEmbed.setDescription(m);
    message.channel.send(queueEmbed);
  });
}
