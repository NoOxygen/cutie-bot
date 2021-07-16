exports.run = async(client, message, [srvr, ...confession]) => {
    if (message.channel.type === 'dm') {
        const { Client, MessageEmbed } = require('discord.js');

        const embed = new MessageEmbed()
            .setColor(0xffd1dc)
            .setDescription(`${confession.join(" ")}`)
            .setTimestamp();

        if (await client.settings.get(`${srvr}.anonChnl`) === null) return;
        const sendSrvr = await client.settings.get(`${srvr}.guild`)
        const sendChnl = await client.settings.get(`${srvr}.anonChnl`)

        if (srvr === sendSrvr) {
            client.channels.cache.get(sendChnl).send(embed).catch(console.error);
        }
    } else {}
}

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: [],
	permLevel: "User"
};

exports.help = {
	name: "anon",
	category: "Miscellaneous",
	description: "Sends an anonymous message - DM command only",
	usage: "Check the anon channel for usage info"
};