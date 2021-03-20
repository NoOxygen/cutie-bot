exports.run = async(client, message, args) => {
    const moment = require("moment-timezone");
    require("moment-duration-format");

    await client.birthdays.ensure(`${message.guild.id}-${message.author.id}`, {
        guild: message.guild.id,
        username: message.author.id,
        date: null,
        timezone: null
    });


    let Args = args.join(" ");
    if (!Args) return message.channel.send("To get your birthday set up, tell me when your birthday is in the `Do MMMM, Timezone` (17th October, Europe/London) format. Find your timezone here <https://xske.github.io/tz/> and copy/paste/type the exact same thing");
    let date = Args.slice(0, Args.indexOf(","))
    let timezone = Args.slice(Args.indexOf(",") + 2, Args.length)

    if (moment(date, "Do MMMM").format("Do MMMM") !== date) {
        message.channel.send("Please tell me your date in the Do MMMM format. Example: 17th October")
    } else {
        await client.birthdays.set(`${message.guild.id}-${message.author.id}.date`, date)
        await client.birthdays.set(`${message.guild.id}-${message.author.id}.timezone`, timezone)
        message.channel.send("Your birthday has been recorded!")
    }
}