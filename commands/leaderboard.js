exports.run = async (client, message, args) => {
  const { Client, MessageEmbed } = require('discord.js');
  // Get a filtered list (for this guild only), and convert to an array while we're at it.
  var filtered = client.points.filter( p => p.guild === message.guild.id ).array();

  // Sort it to get the top results... well... at the top. Y'know.
  var sorted = filtered.sort((a, b) => b.points - a.points);

  var i = 0
  var j = 10

  // Slice it, dice it, get the top 10 of it!
  var top10 = sorted.splice(i, j);

  // Now shake it and show it! (as a nice embed, too!)
  const embed = new MessageEmbed()
    .setTitle("Leaderboard")
    .setAuthor(client.user.username, client.user.avatarURL)
    .setDescription("Our top 10 points leaders!")
    .setColor(0xffd1dc);
  for(const data of top10) {
    embed.addField(`${data.username}`, `${data.points} points (level ${data.level})`);
  }
  try{
    var leaderboard = await message.channel.send({embed});
    await leaderboard.react("⬅️");
    await leaderboard.react("➡️");
  } catch (error) {
    console.error(error);
  }

  const filter = (reaction, user) => user.id !== message.client.user.id;
  var collector = leaderboard.createReactionCollector(filter, {
    time: 60000
  });

  collector.on("collect", async (reaction, user) => {
    const member = message.guild.member(user);

    if (reaction.emoji.name === "➡️") {
      var newfiltered = client.points.filter( p => p.guild === message.guild.id ).array();
      var newsorted = newfiltered.sort((a, b) => b.points - a.points);
      reaction.users.remove(user).catch(console.error);
      i = i + 10
      j = j + 10
      var topNext = newsorted.splice(i, j);
      console.log(topNext);
      const nextEmbed = new MessageEmbed()
        .setTitle("Leaderboard")
        .setAuthor(client.user.username, client.user.avatarURL)
        .setDescription("More places")
        .setColor(0xffd1dc);
      for(const data of topNext) {
        embed.addField(`${data.username}`, `${data.points} points (level ${data.level})`);}
      await leaderboard.edit(nextEmbed);
    } else if (reaction.emoji.name === "⬅️"){
      var oldfiltered = client.points.filter( p => p.guild === message.guild.id ).array();
      var oldsorted = oldfiltered.sort((a, b) => b.points - a.points);
      reaction.users.remove(user).catch(console.error);
      i = i - 10
      j = j - 10
      if (i < 0) return;
      var topPrev = oldsorted.splice(i, j);
      const prevEmbed = new MessageEmbed()
        .setTitle("Leaderboard")
        .setAuthor(client.user.username, client.user.avatarURL)
        .setDescription("More places")
        .setColor(0xffd1dc);
      for(const data of topPrev) {
        embed.addField(`${data.username}`, `${data.points} points (level ${data.level})`);}
      await leaderboard.edit(prevEmbed);
    }
  });

  collector.on("end", () => {
    leaderboard.reactions.removeAll().catch(console.error);
  });
}
