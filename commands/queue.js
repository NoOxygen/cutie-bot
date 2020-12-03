exports.run = (client, message) => {
  const { MessageEmbed, splitMessage, escapeMarkdown } = require("discord.js");
  const queue = message.client.queue.get(message.guild.id);
	const history = message.client.past.get(message.guild.id);
  if (!queue) return message.channel.send("There is nothing playing.").catch(console.error);

  const description = queue.songs.map((song, index) => `${index + 1}. ${escapeMarkdown(song.title)}`);
	const past = history.songs.map((song, index) => `${index + 1}. ${escapeMarkdown(song.title)}`);

  console.log(description.length)

  console.log(past)

  if (past.length === 0) {
		const freshEmbed = new MessageEmbed()
			.setTitle("Cutie Music Queue")
			.addField("Queue", description)
			.setColor("0xffd1dc");
		message.channel.send(freshEmbed);
	} else {
		const queueEmbed = new MessageEmbed()
			.setTitle("Cutie Music Queue")
			.addField("Previously played", past)
			.addField("Queue", description)
			.setColor("0xffd1dc");
		message.channel.send(queueEmbed);
	}

	// 	const splitPast = splitMessage(past, {
	//     maxLength: 2048,
	//     char: "\n",
	//     prepend: "",
	//     append: ""
	//   });
	//
  // const splitDescription = splitMessage(description, {
  //   maxLength: 2048,
  //   char: "\n",
  //   prepend: "",
  //   append: ""
  // });
	//
	// splitPast.forEach(async (m) => {
  //   queueEmbed.setDescription(m);
  // });
	//
  // // splitDescription.forEach(async (m) => {
  // //   queueEmbed.setDescription(m);
  // //   message.channel.send(queueEmbed);
  // // });
}
