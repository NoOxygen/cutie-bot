exports.run = async(client, message, args) => {
    const moment = require("moment-timezone");
    require("moment-duration-format");

    if (!message.member.hasPermission('ADMINISTRATOR'))
        return message.reply("you can't use this command.");

    await client.birthdays.ensure(`${message.guild.id}-${message.author.id}`, {
        guild: message.guild.id,
        username: message.mentions.members.first().id,
        date: null,
        timezone: null
    });


    let Args = args.join(" ");
    if (!Args) return message.channel.send("To get someone else's birthday set up, tell me when their birthday is in the `Do MMMM, Timezone` (17th October, Europe/London) format and tag them at the end of the message");
    let date = Args.slice(0, Args.indexOf(","))
    let timezone = Args.slice(Args.indexOf(",") + 2, Args.length)

    if (moment(date, "Do MMMM").format("Do MMMM") !== date) {
        message.channel.send("Please tell me the date in the Do MMMM format. Example: 17th October")
    } else {
        await client.birthdays.set(`${message.guild.id}-${message.mentions.members.first().id}.date`, date)
        await client.birthdays.set(`${message.guild.id}-${message.mentions.members.first().id}.timezone`, timezone)
        message.channel.send("The birthday has been recorded!")
    }
}