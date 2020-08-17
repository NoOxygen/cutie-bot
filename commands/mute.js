exports.run = (client, message, [mention, ...reason]) => {
  let muteRole = message.guild.roles.cache.find(role => role.name === "Muted");

  const modRole = message.guild.roles.cache.find(role => role.name === "staff");
  if (!modRole) return;

  if (!message.member.roles.cache.has(modRole.id))
    return message.reply("You can't use this command.");

  if (message.mentions.members.size === 0)
    return message.reply("Please mention a user to ban");

  const muteMember = message.mentions.members.first();

  muteMember.roles.add(muteRole).catch(console.error);
  message.channel.send(`Muted.`);
};
