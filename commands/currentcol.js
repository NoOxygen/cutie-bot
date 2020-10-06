exports.run = (client, message, [mention]) => {

  if(message.mentions.members.size === 0){
		color = message.member.roles.cache.find(a => a.name.endsWith(' col'))
		return message.channel.send(`${message.author.username} has the color ${color.hexColor}`)
	} else {
		const colormember = message.mentions.members.first();
		color = colormember.roles.cache.find(a => a.name.endsWith(' col'))
		return message.channel.send(`${colormember.displayName} has the color ${color.hexColor}`)
	}
}
