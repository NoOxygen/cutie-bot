exports.run = (client, message, [mention, ...reason]) => {
  const moment = require("moment-timezone");
  actionDate = moment().tz('Europe/London').format('DD MMM YYYY hh:mm:ss')

  if(!message.member.hasPermission('ADMINISTRATOR'))
    return message.reply("you can't use this command.");

  if(!message.member.hasPermission('BAN_MEMBERS'))
    return message.reply("you can't use this command.");

  if (message.mentions.members.size === 0)
    return message.reply("please mention a user to ban");

  if (!message.guild.me.hasPermission("BAN_MEMBERS"))
    return message.reply("");

  const banMember = message.mentions.members.first();

  banMember.ban(reason.join(" ")).then(member => {
    message.reply(`${member.user.username} was succesfully banned.`);

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
