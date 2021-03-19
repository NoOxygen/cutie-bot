module.exports = async(client, message) => {
    const { MessageEmbed } = require("discord.js");
    if (message.channel.type === 'dm') return;
    const key = `${message.guild.id}`

    if (await !client.settings.has(`${key}`)) return;
    if (await client.settings.get(`${key}.logChnl`) === null) return;

    if (message.partial) return;
    if (message.content === null) return;

    if (message.attachments.size > 0) {
        const embed = new MessageEmbed()
            .setColor(0xffd1dc)
            .addField(`Message deleted in #${message.channel.name}`, `*An image/video was deleted*`)
            .addField(`Message Author`, `${message.author}`)
            .setTimestamp();
        const sendChnl = await client.settings.get(`${key}.logChnl`)
        client.channels.cache.get(sendChnl).send(embed)
    } else if (message.author.bot) {} else {
        const embed = new MessageEmbed()
            .setColor(0xffd1dc)
            .addField(`Message deleted in #${message.channel.name}`, `${message.content}`)
            .addField(`Message Author`, `${message.author}`)
            .setTimestamp();
        const sendChnl = await client.settings.get(`${key}.logChnl`)
        client.channels.cache.get(sendChnl).send(embed)
    }
}