exports.run = (client, message, [chnl, ...text]) => {
	if(!message.member.hasPermission('ADMINISTRATOR'))
    return;

  if(!message.member.hasPermission('MANAGE_MESSAGES'))
    return;

  var checkChannel = message.mentions.channels.first().id

  message.guild.channels.cache.get(checkChannel).startTyping();
  var timeout = argu.length * 150
	setTimeout(() => {
		client.channels.cache.get(checkChannel).send(`${text.join(" ")}`).then((message) => {
			client.channels.cache.get(checkChannel).stopTyping();
		});
	}, timeout)
}
