exports.run = (client, message) => {
  if(!message.channel.name.includes("ticket-")) return message.channel.send("You cannot use that here!")
  message.channel.overwritePermissions([
  {
    id: message.guild.id,
    deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
  }
]);
  message.channel.send("This channel has been archived for staff to check for any rule-breaking. Once it has been checked, the staff is expected to manually delete the channel")
}
