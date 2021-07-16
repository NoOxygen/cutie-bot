exports.run = async(client, message, args) => {
    const { Client, MessageEmbed } = require('discord.js');

    if (!message.member.hasPermission('ADMINISTRATOR'))
        return message.reply("you can't use this command.");

    const key = `${message.guild.id}`

    if (args[0] === "anon") {
        await client.settings.set(key.anonChnl, null);
        message.channel.send("Anonymous channel unset")
    } else if (args[0] === "logger") {
        await client.settings.set(key.logChnl, null)
        message.channel.send("Log channel unset")
    } else {
        message.channel.send("You aren't doing it right - the command is `qt unset <anon/logger>`")
    }
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: "Modmin"
};

exports.help = {
	name: "unset",
	category: "Modmin",
	description: "Removes anonymous/logging channel",
	usage: "unset anon\nunset logger"
};