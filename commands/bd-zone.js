exports.run = async(client, message, args) => {
    const moment = require("moment-timezone");
    require("moment-duration-format");


    if (!args[0]) return message.channel.send("Find your timezone here <https://xske.github.io/tz/> and tell me it by passing the command `qt bd-zone timezone`. Example: `qt bd-zone Asia/Calcutta");
    let timezone = args[0]

    if (timezone.includes('/')) {
        await client.birthdays.set(`${message.guild.id}-${message.author.id}.timezone`, timezone)
        message.channel.send("Added your timezone to my records")
    } else {
        return message.channel.send("Invalid timezone format :(")
    }
}