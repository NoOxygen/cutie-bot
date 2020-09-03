exports.run = async (client, message, args) => {
  const { Client, MessageEmbed } = require('discord.js');
  // Get a filtered list (for this guild only), and convert to an array while we're at it.
  const filtered = client.points.filter( p => p.guild === message.guild.id ).array();

  // Sort it to get the top results... well... at the top. Y'know.
  const sorted = filtered.sort((a, b) => b.points - a.points);

  var p = 0
  var q = 10

  // Slice it, dice it, get the top 10 of it!
  const top10 = sorted.splice(p, q);

  // Now shake it and show it! (as a nice embed, too!)
  const embed = new MessageEmbed()
    .setTitle("Leaderboard")
    .setAuthor(client.user.username, client.user.avatarURL)
    .setDescription("Our top 10 points leaders!")
    .setColor(0x00AE86);
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

  collector.on("collect", (reaction, user) => {
    const member = message.guild.member(user);

    switch (reaction.emoji.name) {
      case "➡️":
        reaction.users.remove(user).catch(console.error);
        p = p + 10
        q = q + 10
        const nextEmbed = new MessageEmbed()
          .setTitle("Leaderboard")
          .setAuthor(client.user.username, client.user.avatarURL)
          .setDescription("More places")
          .setColor(0x00AE86);
        for(const data of top10) {
          embed.addField(`${data.username}`, `${data.points} points (level ${data.level})`);}
        leaderboard.edit(nextEmbed);
        break;

      case "⬅️":
        reaction.users.remove(user).catch(console.error);
        p = p - 10
        q = q - 10
        if (p < 0) return
        const prevEmbed = new MessageEmbed()
          .setTitle("Leaderboard")
          .setAuthor(client.user.username, client.user.avatarURL)
          .setDescription("More places")
          .setColor(0x00AE86);
        for(const data of top10) {
          embed.addField(`${data.username}`, `${data.points} points (level ${data.level})`);}
        leaderboard.edit(prevEmbed);
        break;

      default:
        break;
    }
  });

  collector.on("end", () => {
    leaderboard.reactions.removeAll().catch(console.error);
  });
}
