exports.run = (client, message, [mention, ...reason]) => {
    let muteRole = message.guild.roles.cache.find(role => role.name === "Muted");

    if (!message.member.hasPermission('MUTE_MEMBERS'))
        return message.reply("you can't use this command.");

    if (message.mentions.members.size === 0)
        return message.reply("please mention a user to unmute");

    const muteMember = message.mentions.members.first();

    muteMember.roles.remove(muteRole).catch(console.error);
    message.channel.send(`Unmuted.`);
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: "Modmin"
};

exports.help = {
	name: "unmute",
	category: "Modmin",
	description: "Unmute a user",
	usage: "unmute [@user]"
};