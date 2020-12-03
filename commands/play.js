exports.run = async (client, message, args) => {
  const { play } = require("../include/play");
  const { MessageEmbed } = require("discord.js");
  const { YOUTUBE_API_KEY, SOUNDCLOUD_CLIENT_ID } = require("../config.json");
  const ytdl = require("ytdl-core");
  const YouTubeAPI = require("simple-youtube-api");
  const youtube = new YouTubeAPI(YOUTUBE_API_KEY);
  const scdl = require("soundcloud-downloader");
  const { channel } = message.member.voice;
  var t = 0
	var q = 0

  const serverQueue = message.client.queue.get(message.guild.id);
  if (!channel) return message.channel.send("You need to join a voice channel first!").catch(console.error);
  if (serverQueue && channel !== message.guild.me.voice.channel)
    return message.channel.send(`You must be in the same channel as ${message.client.user}`).catch(console.error);

  if (!args.length) {
    let errorEmbed = new MessageEmbed()
      .setColor(0xffd1dc)
      .setDescription(`You didn't tell me what to play`)
    return message.channel
      .send(errorEmbed)
      .catch(console.error);
  }

  const permissions = channel.permissionsFor(message.client.user);
  if (!permissions.has("CONNECT")) {
    const errorEmbed = new MessageEmbed()
      .setColor(0xffd1dc)
      .setDescription("Cannot connect to voice channel, missing permissions")
    return message.channel.send(errorEmbed);
  }

  if (!permissions.has("SPEAK")) {
    const errorEmbed = new MessageEmbed()
      .setColor(0xffd1dc)
      .setDescription("I cannot speak in this voice channel, make sure I have the proper permissions!")
    return message.channel.send(errorEmbed);
  }

  const search = args.join(" ");
  const videoPattern = /^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi;
  const playlistPattern = /^.*(list=)([^#\&\?]*).*/gi;
  const scRegex = /^https?:\/\/(soundcloud\.com)\/(.*)$/;
  const url = args[0];
  const urlValid = videoPattern.test(args[0]);

  // Start the playlist if playlist url was provided
  if (!videoPattern.test(args[0]) && playlistPattern.test(args[0])) {
    return message.client.commands.run("playlist").run(client, message, args);
  } else if (scdl.isValidUrl(url) && url.includes('/sets/')) {
    return message.client.commands.run("playlist").execute(message, args);
  }

  const queueConstruct = {
    textChannel: message.channel,
    channel,
    connection: null,
    songs: [],
    loop: false,
    volume: 100,
    playing: true
  };

	const pastConstruct = {
    textChannel: message.channel,
    channel,
    connection: null,
    songs: [],
    loop: false,
    volume: 100,
    playing: true
  };

  let songInfo = null;
  let song = null;

  if (urlValid) {
    try {
			songInfo = await ytdl.getInfo(url);
	    song = {
	      title: songInfo.videoDetails.title,
	      url: songInfo.videoDetails.video_url,
	      duration: songInfo.videoDetails.lengthSeconds
	    };
    } catch (error) {
      console.error(error);
      return message.channel.send(error.message).catch(console.error);    }
  } else if (scRegex.test(url)) {
    // It is a valid Soundcloud URL
    if (!SOUNDCLOUD_CLIENT_ID){
      const errorEmbed = new MessageEmbed()
        .setColor(0xffd1dc)
        .setDescription("Missing Soundcloud Client ID in config")
      return message.channel.send(errorEmbed).catch(console.error);
    }

    try {
      const trackInfo = await scdl.getInfo(url, SOUNDCLOUD_CLIENT_ID);
      song = {
        title: trackInfo.title,
        url: url
      };
    } catch (error) {
    if (error.statusCode === 404){
      const errorEmbed = new MessageEmbed()
        .setColor(0xffd1dc)
        .setDescription("Couldn't find that Soundcloud track")
      return message.channel.send(errorEmbed).catch(console.error);
    }
    const errorEmbed = new MessageEmbed()
      .setColor(0xffd1dc)
      .setDescription("There was an error playing that Soundcloud track.")
  return message.channel.send(errorEmbed).catch(console.error);
  }
  } else {
      try {
        do {
					t = t + 1
					if(t === 5){
						var t = 0;
						break;
					}
					const results = await youtube.searchVideos(search, 1);
	        songInfo = await ytdl.getInfo(results[0].url);
	        song = {
	          title: songInfo.videoDetails.title,
	          url: songInfo.videoDetails.video_url,
	          duration: songInfo.videoDetails.lengthSeconds
	        };
				} while (!song.title)
    } catch (error) {
      console.error(error);
			const errorEmbed = new MessageEmbed()
        .setColor(0xffd1dc)
        .setDescription("No video was found with a matching title")
      return message.channel.send(errorEmbed).catch(console.error);
    }
  }

  if (serverQueue) {
		if (serverQueue.songs[serverQueue.songs.length - 1].url == song.url) return message.channel.send ("that song already is in the queue");
    serverQueue.songs.push(song);
    const addEmbed = new MessageEmbed()
      .setColor(0xffd1dc)
      .setDescription(`✅ **${song.title}** has been added to the queue by ${message.author.username}`)
    return serverQueue.textChannel
      .send(addEmbed)
      .catch(console.error);
  }

  queueConstruct.songs.push(song);
  message.client.queue.set(message.guild.id, queueConstruct);
	message.client.past.set(message.guild.id, pastConstruct);

  try {
    queueConstruct.connection = await channel.join();
    await queueConstruct.connection.voice.setSelfDeaf(true);
    play(queueConstruct.songs[0], message);
  } catch (error) {
    console.error(error);
    message.client.queue.delete(message.guild.id);
    await channel.leave();
    const errorEmbed = new MessageEmbed()
      .setColor(0xffd1dc)
      .setDescription(`Could not join the channel: ${error}`)
    return message.channel.send(errorEmbed).catch(console.error);
  }
}
