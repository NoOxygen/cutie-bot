module.exports = (client, member) => {
	const { MessageEmbed } = require("discord.js");
	const moment = require("moment-timezone");
	actionDate = moment(Date.now()).format('hh:mm DD/MM/YYYY')

	const key = `${member.guild.id}`

	const embed = new MessageEmbed()
		.setColor(0xffd1dc)
		.setDescription(`${member.user} left the server`)
		.setFooter(`${actionDate}`)

	if (!client.logger.has(key)) return;
	if (client.logger.get(key, "logChnl") === null) return;
	const sendChnl = client.logger.get(key, "logChnl")
	client.channels.cache.get(sendChnl).send(embed).catch(console.error);
}
