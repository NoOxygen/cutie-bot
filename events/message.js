module.exports = (client, message) => {
  // Ignore all bots
  if (message.author.bot) return;

  // If this is not in a DM, execute the points code.
  if (message.guild) {
    // We'll use the key often enough that simplifying it is worth the trouble.
    const key = `${message.guild.id}-${message.author.id}`;

    // Triggers on new users we haven't seen before.
    client.points.ensure(`${message.guild.id}-${message.author.id}`, {
      user: message.author.id,
      guild: message.guild.id,
      points: 0,
      level: 0,
      username: message.member.user.tag
    });

    if (message.content.length >= 7 && !message.content.startsWith(client.config.prefix)) {
      client.points.inc(key, "points");
    }


    // Calculate the user's current level
    const curLevel = Math.floor(0.1 * Math.sqrt(client.points.get(key, "points")));

    // Act upon level up by sending a message and updating the user's level in enmap.
    if (client.points.get(key, "level") < curLevel) {
      const botChannel = message.guild.channels.cache.find(channel => channel.name === "bot").id;
      client.channels.cache.get(botChannel).send(`<@${message.author.id}> leveled up to level **${curLevel}**! :)`);
      client.points.set(key, curLevel, "level");
    }
    if (client.points.get(key, "level") === 3) {
      const rankRole = message.guild.roles.cache.find(role => role.name === "active")
      if (!rankRole) {};

      message.member.roles.add(rankRole).catch(console.error)
    }
  }

  // Ignore messages not starting with the prefix (in config.json)
  if (message.content.indexOf(client.config.prefix) !== 0) return;

  // Our standard argument/command name definition.
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === "leaderboard") {
    const { Client, MessageEmbed } = require('discord.js');
    // Get a filtered list (for this guild only), and convert to an array while we're at it.
    const filtered = client.points.filter( p => p.guild === message.guild.id ).array();

    // Sort it to get the top results... well... at the top. Y'know.
    const sorted = filtered.sort((a, b) => b.points - a.points);

    // Slice it, dice it, get the top 10 of it!
    const top10 = sorted.splice(0, 10);

    // Now shake it and show it! (as a nice embed, too!)
    const embed = new MessageEmbed()
      .setTitle("Leaderboard")
      .setAuthor(client.user.username, client.user.avatarURL)
      .setDescription("Our top 10 points leaders!")
      .setColor(0x00AE86);
    for(const data of top10) {
      embed.addField(`${data.username}`, `${data.points} points (level ${data.level})`);
    }
    return message.channel.send({embed});
  }

  if(command === "give") {
    // Limited to mods- adjust to your own preference!
    if (!message.member.roles.cache.some(r=>["staff", "admin", "aide"].includes(r.name)))
      return message.reply("you can't use this command.");

    const user = message.mentions.users.first();
    if(!user) return message.reply("You must mention!");

    const pointsToAdd = parseInt(args[1], 10);
    if(!pointsToAdd)
      return message.reply("You didn't tell me how many points to give... :(")

    // Ensure there is a points entry for this user.
    client.points.ensure(`${message.guild.id}-${user.id}`, {
      user: message.author.id,
      guild: message.guild.id,
      points: 0,
      level: 0
    });

    // Get their current points.
    let userPoints = client.points.get(`${message.guild.id}-${user.id}`, "points");
    userPoints += pointsToAdd;


    // And we save it!
    client.points.set(`${message.guild.id}-${user.id}`, userPoints, "points")

    message.channel.send(`${user.tag} has received ${pointsToAdd} points and now stands at ${userPoints} points.`);
  }

  if(command === "takeaway") {
    // Limited to mods- adjust to your own preference!
    if (!message.member.roles.cache.some(r=>["staff", "admin", "aide"].includes(r.name)))
      return message.reply("you can't use this command.");

    const user = message.mentions.users.first()
    if(!user) return message.reply("You must mention someone!");

    const pointsToDed = parseInt(args[1], 10);
    if(!pointsToDed)
      return message.reply("You didn't tell me how many points to give... :(")

    // Ensure there is a points entry for this user.
    client.points.ensure(`${message.guild.id}-${user.id}`, {
      user: message.author.id,
      guild: message.guild.id,
      points: 0,
      level: 0
    });

    // Get their current points.
    let userPoints = client.points.get(`${message.guild.id}-${user.id}`, "points");
    userPoints -= pointsToDed;

    // And we save it!
    client.points.set(`${message.guild.id}-${user.id}`, userPoints, "points")

    message.channel.send(`${user.tag} has lost ${pointsToDed} points and now stands at ${userPoints} points.`);
  }

  if(command === "cleanup") {
    // Let's clean up the database of all "old" users,
    // and those who haven't been around for... say a month.

    // Get a filtered list (for this guild only).
    const filtered = client.points.filter( p => p.guild === message.guild.id );

    // We then filter it again (ok we could just do this one, but for clarity's sake...)
    // So we get only users that haven't been online for a month, or are no longer in the guild.
    const rightNow = new Date();
    const toRemove = filtered.filter(data => {
      return !message.guild.members.has(data.user) || rightNow - 2592000000 > data.lastSeen;
    });

    toRemove.forEach(data => {
      client.points.delete(`${message.guild.id}-${data.user}`);
    });

    message.channel.send(`I've cleaned up ${toRemove.size} old farts.`);
  }

  // Grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command);

  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;

  // Run the command
  cmd.run(client, message, args);
};
