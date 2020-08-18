exports.run = (client, message, [mention, ...reason]) => {
  const modRole = message.guild.roles.cache.find(role => role.name === "staff");
  if (!modRole) return;

  if (!message.member.roles.cache.has(modRole.id))
    return message.reply("you can't use this command.");

  if (message.mentions.members.size === 0)
    return message.reply("please mention a user to ban");

  if (!message.guild.me.hasPermission("BAN_MEMBERS"))
    return message.reply("");

  const banMember = message.mentions.members.first();

  banMember.ban(reason.join(" ")).then(member => {
    message.reply(`${member.user.username} was succesfully banned.`);
  });
};
