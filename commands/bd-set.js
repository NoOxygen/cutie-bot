exports.run = async(client, message, [date, ...timezone]) => {
    const moment = require("moment-timezone");
    require("moment-duration-format");

    await client.birthdays.ensure(`${message.guild.id}-${message.author.id}`, {
        guild: message.guild.id,
        username: message.author.id,
        date: null,
        timezone: null
    });

    if (moment(date, "DD-MMM").format("DD-MMM") !== date) 
        return message.channel.send("Please tell me your date in the DD-MMM format. Example: 17-Aug")
    
    if (!timezone) {
        await client.birthdays.set(`${message.guild.id}-${message.author.id}.date`, date)
        await client.birthdays.set(`${message.guild.id}-${message.author.id}.timezone`, "Etc/UTC")

        message.channel.send("Your birthday has been recorded!")
    } else {
        await client.birthdays.set(`${message.guild.id}-${message.author.id}.date`, date)
        await client.birthdays.set(`${message.guild.id}-${message.author.id}.timezone`, timezone)

        message.channel.send("Your birthday has been recorded!")
    }
}