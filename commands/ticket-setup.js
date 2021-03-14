exports.run = async(client, message, args) => {
    // ticket-setup #channel
    const Discord = require("discord.js");

    if (!message.member.hasPermission('MANAGE_CHANNELS'))
        return message.reply("you can't use this command.");

    let channel = message.mentions.channels.first();
    if (!channel) return message.reply("Usage: `ticket-setup #channel`");
    let sent = await channel.send(new Discord.MessageEmbed()
        .setTitle("Tickets")
        .setDescription("By reacting to this post, a ticket channel will open for you")
        .setColor(0xffd1dc)
    );
    sent.react('🎫');
    await client.settings.set(`${message.guild.id}-ticket`, sent.id);
    message.channel.send("Ticket system setup done!")
}