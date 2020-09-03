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
      if (!botChannel) return;
      client.channels.cache.get(botChannel).send(`<@${message.author.id}> leveled up to level **${curLevel}**! :)`);
      client.points.set(key, curLevel, "level");
    }
    if (client.points.get(key, "level") > curLevel) {
      const botChannel = message.guild.channels.cache.find(channel => channel.name === "bot").id;
      if (!botChannel) return;
      client.channels.cache.get(botChannel).send(`<@${message.author.id}> leveled down to level **${curLevel}** :(`);
      client.points.set(key, curLevel, "level");
    }
    if (client.points.get(key, "level") === 3) {
      const rankRole = message.guild.roles.cache.find(role => role.name === "active")
      if (!rankRole) return;

      message.member.roles.add(rankRole).catch(console.error)
    }
  }

  // Ignore messages not starting with the prefix (in config.json)
  msg = message.content.toLowerCase();
  if (msg.indexOf(client.config.prefix) !== 0) return;

  // Our standard argument/command name definition.
  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Grab the command data from the client.commands Enmap
  const cmd = client.commands.get(command);

  // If that command doesn't exist, silently exit and do nothing
  if (!cmd) return;

  // Run the command
  cmd.run(client, message, args);
};
