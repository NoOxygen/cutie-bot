exports.run = async (client, message) => {
  const { MessageEmbed } = require("discord.js");
  const lyricsFinder = require("lyrics-finder");
  const queue = message.client.queue.get(message.guild.id);
  if (!queue) return message.channel.send("There is nothing playing.").catch(console.error);

  let lyrics = null;

  songName = queue.songs[0].title;

	// remove stuff like (Official Video)
	songName = songName.replace(/ *\([^)]*\) */g, '');

	// remove emojis
	songName = songName.replace(
		/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
		''
	);

  try {
    lyrics = await lyricsFinder(songName, "");
    if (!lyrics) lyrics = `No lyrics found for ${songName}.`;
  } catch (error) {
    lyrics = `No lyrics found for ${songName}.`;
  }

  let lyricsEmbed = new MessageEmbed()
    .setTitle("Lyrics")
    .setDescription(lyrics)
    .setColor("0xffd1dc")
    .setTimestamp();

  if (lyricsEmbed.description.length >= 2048)
    lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
  return message.channel.send(lyricsEmbed).catch(console.error);
}
