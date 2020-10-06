module.exports = (client, message) => {
	const { MessageEmbed } = require("discord.js");
	const moment = require("moment-timezone");
	actionDate = moment(Date.now()).format('hh:mm DD/MM/YYYY')

  if (message.partial) return;
	if (message.content === null) return;
	if (message.embeds[0] != null) return;

	const key = `${message.guild.id}`
	const embed = new MessageEmbed()
		.setColor(0xffd1dc)
		.addField(`Message deleted in #${message.channel.name}`, `${message.content}`)
		.addField(`Message Author`, `${message.author}`)
		.setTimestamp(`${actionDate}`)

	const sendChnl = client.logger.get(key, "logChnl")
	client.channels.cache.get(sendChnl).send(embed)
}
