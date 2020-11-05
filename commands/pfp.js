exports.run = async(client, message, args, level) => {
	if (!args || args.length < 1)
		return message.channel.send(message.author.avatarURL());
	let member = message.mentions.members.first();
	message.channel.send(member.user.avatarURL());
};
