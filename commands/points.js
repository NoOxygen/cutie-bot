exports.run = (client, message) => {
  const key = `${message.guild.id}-${message.author.id}`;
  return message.reply(`you currently have ${client.points.get(key, "points")} points, and are level ${client.points.get(key, "level")}!`);
}
