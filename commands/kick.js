exports.run = (client, message, [mention, ...reason]) => {
  const moment = require("moment-timezone");
  actionDate = moment().tz('Europe/London').format('DD MMM YYYY hh:mm:ss')

  if(!message.member.hasPermission('ADMINISTRATOR'))
    return message.reply("you can't use this command.");

  if(!message.member.hasPermission('KICK_MEMBERS'))
    return message.reply("you can't use this command.");

  if (message.mentions.members.size === 0)
    return message.reply("please mention a user to kick");

  if (!message.guild.me.hasPermission("KICK_MEMBERS"))
    return message.reply("");

  const kickMember = message.mentions.members.first();

  kickMember.kick(reason.join(" ")).then(member => {
    message.reply(`${member.user.username} was succesfully kicked.`);

  const logChannel = message.guild.channels.cache.find(channel => channel.name === "mod-log").id;
  if (!logChannel) return;
  client.channels.cache.get(logChannel).send(`
**user:** ${message.user.tag}
**action taken:** kick
**reason for action:** ${reason.join(" ")}
**date/time and timezone:** ${actionDate} GMT
**notes:** (in next message)`).catch(console.error);
  });
};
