exports.run = (client, message, [chnl, ...text) => {
	if(!message.member.hasPermission('ADMINISTRATOR'))
    return;

  if(!message.member.hasPermission('MANAGE_MESSAGES'))
    return;

  message.guild.channels.cache.get(message.mentions.channels.first().id).send(`${text.join(" ")}`)
}
