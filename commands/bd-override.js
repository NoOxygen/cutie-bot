exports.run = async(client, message, args) => {
    const moment = require("moment-timezone");
    require("moment-duration-format");

    await client.birthdays.ensure(`${message.guild.id}-${message.mentions.members.first().id}`, {
        guild: message.guild.id,
        username: message.mentions.members.first().id,
        date: null,
        timezone: null
    });


    let Args = args.join(" ");
    if (!Args) return message.channel.send("To get your birthday set up, tell me when your birthday is in the `DD-MMM Timezone` (17-Aug Europe/London) format. Find your timezone here <https://xske.github.io/tz/> and copy/paste/type the exact same thing");
    let date = Args.slice(0, Args.indexOf(" "))
    let timezone = Args.slice(Args.indexOf(" ") + 1, Args.length)

    if (moment(date, "DD-MMM").format("DD-MMM") !== date) {
        message.channel.send("Please tell me your date in the DD-MMM format. Example: 17-Aug")
    } else {
        await client.birthdays.set(`${message.guild.id}-${message.mentions.members.first().id}.date`, date)
        if (!timezone) {
            await client.birthdays.set(`${message.guild.id}-${message.mentions.members.first().id}.timezone`, "Etc/UTC")
        } else {
            await client.birthdays.set(`${message.guild.id}-${message.mentions.members.first().id}.timezone`, timezone)
        }

        message.channel.send("Your birthday has been recorded!")
    }
}