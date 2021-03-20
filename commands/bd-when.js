exports.run = async(client, message, args, level) => {
    if (message.mentions.members.size > 0) {
        member = message.mentions.members.first();
        date = await client.birthdays.get(`${message.guild.id}-${member.id}.date`)
        message.channel.send(`${member.user.tag}'s birthday is on ${date}!`)
    } else {
        member = message.member;
        date = await client.birthdays.get(`${message.guild.id}-${member.id}.date`)
        message.channel.send(`Your birthday is on ${date}!`)
    }
}