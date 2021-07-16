exports.run = (client, message) => {
  message.channel.send(`https://cdn.discordapp.com/attachments/715250117128617988/745580107602591744/flat-design-color-chart.png`)
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ["colours"],
	permLevel: "User"
};

exports.help = {
	name: "colors",
	category: "Colors",
	description: "Send a color chart with hex codes",
	usage: "colors"
};