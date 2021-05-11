exports.run = (client, message) => {
    const { version } = require("discord.js");
    const moment = require("moment");
    require("moment-duration-format");
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

    const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

    message.channel.send(`= The Rainbow Connection Status =
• Mem Usage  :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
• Uptime     :: ${duration}
• Servers    :: ${client.guilds.cache.size.toLocaleString()}
• Users      :: ${client.users.cache.size.toLocaleString()}
• Github     :: https://github.com/Sid127/cutie-bot
= The Rainbow Connection was created by Sid <3 =`, {
        code: "asciidoc"
    });

}
