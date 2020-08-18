exports.run = (client, message, [mention, ...reason]) => {
  let muteRole = message.guild.roles.cache.find(role => role.name === "Muted");

  if (!message.member.roles.cache.some(r=>["staff", "aide", "admin"].includes(r.name)))
    return message.reply("You can't use this command.");

  if (message.mentions.members.size === 0)
    return message.reply("Please mention a user to ban");

  const muteMember = message.mentions.members.first();

  muteMember.roles.remove(muteRole).catch(console.error);
  message.channel.send(`Unmuted.`);
};
