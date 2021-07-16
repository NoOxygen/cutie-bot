exports.run = (client, message, args) => {
  const mmbr = message.guild.member(message.author);
  if (mmbr == client.user) return;

  const roleCheck = message.member.roles.cache.find(a => a.name.endsWith(' col'))
  if (!roleCheck)
    return;

  mmbr.roles.cache.find(a => a.name.endsWith(' col')).delete();
  message.channel.send(`${mmbr.displayName}, color removed.`).catch(console.error)
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ["removecol"],
	permLevel: "User"
};

exports.help = {
	name: "cleancol",
	category: "Colors",
	description: "Remove your current color",
	usage: "cleancol"
};