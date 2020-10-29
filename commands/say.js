exports.run = (client, message, [chnl, ...text]) => {
  if(!message.member.hasPermission('MANAGE_MESSAGES'))
    return;

  var checkChannel = message.mentions.channels.first().id

  message.guild.channels.cache.get(checkChannel).startTyping();
  var timeout = text.length * 250
	setTimeout(() => {
		client.channels.cache.get(checkChannel).send(`${text.join(" ")}`).then((message) => {
			client.channels.cache.get(checkChannel).stopTyping();
		});
	}, timeout)
}
