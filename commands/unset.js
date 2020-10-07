exports.run = (client, message, args) => {
	const { Client, MessageEmbed } = require('discord.js');

	if(!message.member.hasPermission('ADMINISTRATOR'))
		return message.reply("you can't use this command.");

  const key = `${message.guild.id}`

	if (args[0] === "anon") {
		client.confess.set(key, null, "anonChnl");
		message.channel.send("Anonymous channel unset")
	} else if (args[0] === "logger") {
		client.logger.set(key, null, "logChnl")
		message.channel.send("Log channel unset")
	} else {
		message.channel.send("You aren't doing it right - the command is `qt unset <anon/logger>`")
	}
}
