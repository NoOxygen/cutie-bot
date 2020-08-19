exports.run = (client, message, args) => {
  const mmbr = message.guild.member(message.author);
  if (mmbr == client.user) return;

  const roleCheck = message.member.roles.cache.find(a => a.name.endsWith(' col'))
  if (!roleCheck)
    return;

  mmbr.roles.cache.find(a => a.name.endsWith(' col')).delete();
  message.channel.send(`${mmbr.displayName}, color removed.`).catch(console.error)
}
