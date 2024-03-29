exports.run = (client, message, [mention, ...reason]) => {
    let muteRole = message.guild.roles.cache.find(role => role.name === "Muted");

    if (!message.member.hasPermission('MUTE_MEMBERS'))
        return message.reply("you can't use this command.");

    if (message.mentions.members.size === 0)
        return message.reply("please mention a user to mute");

    const muteMember = message.mentions.members.first();

    muteMember.roles.add(muteRole).catch(console.error);
    message.channel.send(`Muted.`);
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: "Modmin"
};

exports.help = {
	name: "mute",
	category: "Modmin",
	description: "Mute a user",
	usage: "mute [@user]"
};