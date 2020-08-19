exports.run = (client, message, [mention]) => {

  if(message.mentions.members.size === 0){
    const key = `${message.guild.id}-${message.author.id}`;
    return message.reply(`you currently have ${client.points.get(key, "points")} points, and are level ${client.points.get(key, "level")}!`);
  }

  else if (message.mentions.members.size === 1) {
    const keyMember = message.mentions.members.first();
    const key = `${message.guild.id}-${keyMember.id}`;
    return message.channel.send(`${keyMember.displayName} currently has ${client.points.get(key, "points")} points, and is level ${client.points.get(key, "level")}!`);
  } else {
    const key = `${message.guild.id}-${message.author.id}`;
    return message.reply(`you currently have ${client.points.get(key, "points")} points, and are level ${client.points.get(key, "level")}!`);
  }
}
