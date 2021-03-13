exports.run = async(client, message, [mention]) => {
    if (message.mentions.members.size === 0) {
        const key = `${message.guild.id}-${message.author.id}`;
        const point = await client.points.get(`${key}.points`);
        const lvl = await client.points.get(`${key}.level`);
        return await message.reply(`you currently have ${point} points, and are level ${lvl}!`);
    } else if (message.mentions.members.size === 1) {
        const keyMember = message.mentions.members.first();
        const key = `${message.guild.id}-${keyMember.id}`;
        const point = await client.points.get(`${key}.points`);
        const lvl = await client.points.get(`${key}.level`);
        return await message.channel.send(`${keyMember.displayName} currently has ${point})} points, and is level ${lvl}!`);
    }
}