module.exports = async(client, member) => {
    const { MessageEmbed } = require("discord.js");

    const key = `${member.guild.id}`

    const embed = new MessageEmbed()
        .setColor(0xffd1dc)
        .setDescription(`${member.user} left the server`)
        .setTimestamp();

    if (await !client.settings.has(`${key}`)) return;
    if (await client.settings.get(`${key}.logChnl`) === null) return;
    const sendChnl = await client.settings.get(`${key}.logChnl`)
    client.channels.cache.get(sendChnl).send(embed).catch(console.error);
}