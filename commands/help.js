exports.run = (client, message, args) => {
  const { Client, MessageEmbed } = require('discord.js');
  const header = `This bot is a homebrew bot and is being made by one (1) person as a community project/hobby. Support for the bot is NOT guaranteed.

Its current prefix is "qt"

***Current Command List:***`

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
**aww** - sends a random image/post from r/aww
**points** - check your points on this server
**leaderboard** - get the top 10 users on this server`

  const oSS = `This bot is open-source! Check out the source code at https://github.com/Sid127/cutie-bot`

  const colorList = `__*Colors*__

**colors** - brings up a list of some common hex codes
**colorme <hex code>** - changes your color to your given hex code
**cleancol** - removes your color`

  if (args.length < 1) {
    const embed = new MessageEmbed()
      .setTitle("**__CUTIE__**")
      .setColor(0xffd1dc)
      .setDescription(`
${header}

${supportList}

${colorList}

${miscList}

${oSS}`);
    message.channel.send(embed);
  }
  else if (args[0] === "misc") {
    const embed = new MessageEmbed()
      .setTitle("**__CUTIE__**")
      .setColor(0xffd1dc)
      .setDescription(`
${header}

${miscList}

${oSS}`);
    message.channel.send(embed);
  }
  else if (args[0] === "support") {
    const embed = new MessageEmbed()
      .setTitle("**__CUTIE__**")
      .setColor(0xffd1dc)
      .setDescription(`
${header}

${supportList}

${oSS}`);
    message.channel.send(embed);
  }
  else if (args[0] === "color") {
    const embed = new MessageEmbed()
      .setTitle("**__CUTIE__**")
      .setColor(0xffd1dc)
      .setDescription(`
${header}

${colorList}

${oSS}`);
    message.channel.send(embed);
  }
}
