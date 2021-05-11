exports.run = (client, message, args) => {
    const { Client, MessageEmbed } = require('discord.js');

    const supportList = `__*Support*__

**spoilers** - tutorial on how to use spoilers
**spoilers-guide** - info on when and where to use spoilers
**hotlines** - sends a message with links containing helpline/hotlines from various countries
**breathe** - sends 1 out of 3 gifs to breathe along to
**graphics** - sends a randomized graphic containing helpful self-care info
**coping** - sends a super short questionnaire to help you cope
**distractme** - sends a cute video to help take your mind off of things`


    const miscList = `__*Miscellaneous*__

**ping** - checks if the bot is working or not
**pfp** - get a user's profile picture
**aww** - sends a random image/post from r/aww
**points** - check your points on this server
**leaderboard** - get the top 10 users on this server
**levels** - get the full leaderboard as a one-time link
**pronouns** - set your personal pronouns here`

    const colorList = `__*Colors*__

**colors** - brings up a list of some common hex codes
**colorme <hex code>** - changes your color to your given hex code
**currentcol** - reports your current color in hex
**cleancol** - removes your color`

    const music = `__*Music*__

**play** - plays a song/playlist by name/url
**pause**
**resume** - the _play_ command does NOT resume
**playlist** - plays a playlist from url
**np** - shows info on current track
**lyrics** - attempts to find lyrics for the song
**loop** - toggle queue loop
**queue** - get queue
**remove** - remove a song from the queue
**search**
**shuffle**
**skip**
**back**
**stop** - stops all music and clears queue
**leave** - disconnect bot`

    const birthday = `__*Birthdays*__

**bd-set** - Registers your birth date in the format (date) [timezone]. Timezone is optional, defaults to UTC
**bd-zone** - Sets your timezone
**bd-when** - Displays the given user's birthday information
**bd-remove** - Removes your birthday information from this bot
**bd-upcoming** - Gets recent and upcoming birthdays`

    if (args.length < 1) {
        const embed = new MessageEmbed()
            .setTitle("**__The Rainbow Connection__**")
            .setColor(0xffd1dc)
            .setDescription(`
${music}

${birthday}

${supportList}

${colorList}

${miscList}`);
        message.channel.send(embed);
    } else if (args[0] === "misc") {
        const embed = new MessageEmbed()
            .setTitle("**__The Rainbow Connection__**")
            .setColor(0xffd1dc)
            .setDescription(`
${miscList}`);
        message.channel.send(embed);
    } else if (args[0] === "support") {
        const embed = new MessageEmbed()
            .setTitle("**__The Rainbow Connection__**")
            .setColor(0xffd1dc)
            .setDescription(`
${supportList}`);
        message.channel.send(embed);
    } else if (args[0] === "color") {
        const embed = new MessageEmbed()
            .setTitle("**__The Rainbow Connection__**")
            .setColor(0xffd1dc)
            .setDescription(`
${colorList}`);
        message.channel.send(embed);
    } else if (args[0] === "music") {
        const embed = new MessageEmbed()
            .setTitle("**__The Rainbow Connection__**")
            .setColor(0xffd1dc)
            .setDescription(`
${music}`);
        message.channel.send(embed);
    } else if (args[0] === "birthday") {
        const embed = new MessageEmbed()
            .setTitle("**__The Rainbow Connection__**")
            .setColor(0xffd1dc)
            .setDescription(`
${birthday}`);
        message.channel.send(embed);
    }
}
