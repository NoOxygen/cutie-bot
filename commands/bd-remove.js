exports.run = async(client, message) => {
    await client.birthdays.delete(`${message.guild.id}-${message.author.id}`);
    message.channel.send("I no longer know your birthday :(")
}