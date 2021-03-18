const ytdlDiscord = require("ytdl-core-discord");
const scdl = require("soundcloud-downloader").default;
const { canModifyQueue } = require("../util/CutieUtil");
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
    async play(song, message) {
        const { PRUNING, SOUNDCLOUD_CLIENT_ID } = require("../config.json");
        const queue = message.client.queue.get(message.guild.id);
        const past = message.client.past.get(message.guild.id);

        if (!song) {
            queue.channel.leave();
            message.client.past.delete(message.guild.id);
            message.client.queue.delete(message.guild.id);
            // const endEmbed = new MessageEmbed()
            //   .setColor(0xffd1dc)
            //   .setDescription("Music queue ended.")
            // return queue.textChannel.send(endEmbed).catch(console.error);
        }

        let stream = null;
        let streamType = song.url.includes("youtube.com") ? "opus" : "ogg/opus";

        try {
            if (song.url.includes("youtube.com")) {
                stream = await ytdlDiscord(song.url, { highWaterMark: 1 << 25 });
            } else if (song.url.includes("soundcloud.com")) {
                try {
                    stream = await scdl.downloadFormat(
                        song.url,
                        scdl.FORMATS.OPUS,
                        SOUNDCLOUD_CLIENT_ID ? SOUNDCLOUD_CLIENT_ID : undefined
                    );
                } catch (error) {
                    stream = await scdl.downloadFormat(
                        song.url,
                        scdl.FORMATS.MP3,
                        SOUNDCLOUD_CLIENT_ID ? SOUNDCLOUD_CLIENT_ID : undefined
                    );
                    streamType = "unknown";
                }
            }
        } catch (error) {
            if (queue) {
                past.songs.push(queue.songs[0]);
                queue.songs.shift();
                module.exports.play(queue.songs[0], message);
            }

            console.error(error);
            const errorEmbed = new MessageEmbed()
                .setColor(0xffd1dc)
                .setDescription(`Error: ${error.message ? error.message : error}`)
            return message.channel.send(errorEmbed);
        }

        queue.connection.on("disconnect", () => message.client.queue.delete(message.guild.id));

        const dispatcher = queue.connection
            .play(stream, { type: streamType })
            .on("finish", () => {
                if (collector && !collector.ended) collector.stop();

                if (queue.loop) {
                    // if loop is on, push the song back at the end of the queue
                    // so it can repeat endlessly
                    let lastSong = queue.songs.shift();
                    queue.songs.push(lastSong);
                    module.exports.play(queue.songs[0], message);
                } else {
                    // Recursively play the next song
                    past.songs.push(queue.songs[0]);
                    queue.songs.shift();
                    module.exports.play(queue.songs[0], message);
                }
            })
            .on("error", (err) => {
                console.error(err);
                past.songs.push(queue.songs[0]);
                queue.songs.shift();
                module.exports.play(queue.songs[0], message);
            });
        dispatcher.setVolumeLogarithmic(queue.volume / 100);

        try {
            const playEmbed = new MessageEmbed()
                .setColor(0xffd1dc)
                .setDescription(`🎶 Started playing: **${song.title}**`)
            var playingMessage = await queue.textChannel.send(playEmbed);
            await playingMessage.react("⏮️");
            await playingMessage.react("⏯");
            await playingMessage.react("⏭");
            await playingMessage.react("🔁");
            await playingMessage.react("⏹");
        } catch (error) {
            console.error(error);
        }

        const filter = (reaction, user) => user.id !== message.client.user.id;
        var collector = playingMessage.createReactionCollector(filter, {
            time: song.duration > 0 ? song.duration * 1000 : 600000
        });

        collector.on("collect", (reaction, user) => {
            if (!queue) return;
            const member = message.guild.member(user);

            switch (reaction.emoji.name) {
                case "⏭":
                    queue.playing = true;
                    reaction.users.remove(user).catch(console.error);
                    if (!canModifyQueue(member)) return;
                    queue.connection.dispatcher.end();
                    const skipEmbed = new MessageEmbed()
                        .setColor(0xffd1dc)
                        .setDescription(`${user.username} skipped the song`)
                    queue.textChannel.send(skipEmbed).catch(console.error);
                    collector.stop();
                    break;

                case "⏮️":
                    queue.playing = true;
                    reaction.users.remove(user).catch(console.error);
                    if (!canModifyQueue(member)) return;
                    const cmd = message.client.commands.get("back")
                    cmd.run(message.client, message)
                    collector.stop();
                    break;

                case "⏯":
                    reaction.users.remove(user).catch(console.error);
                    if (!canModifyQueue(member)) return;
                    if (queue.playing) {
                        queue.playing = !queue.playing;
                        queue.connection.dispatcher.pause(true);
                        const pauseEmbed = new MessageEmbed()
                            .setColor(0xffd1dc)
                            .setDescription(`${user.username} paused the music.`)
                        queue.textChannel.send(pauseEmbed).catch(console.error);
                    } else {
                        queue.playing = !queue.playing;
                        queue.connection.dispatcher.resume();
                        const unpauseEmbed = new MessageEmbed()
                            .setColor(0xffd1dc)
                            .setDescription(`${user.username} resumed the music!`)
                        queue.textChannel.send(unpauseEmbed).catch(console.error);
                    }
                    break;

                case "🔁":
                    reaction.users.remove(user).catch(console.error);
                    if (!canModifyQueue(member)) return;
                    queue.loop = !queue.loop;
                    const loopEmbed = new MessageEmbed()
                        .setColor(0xffd1dc)
                        .setDescription(`Loop is now ${queue.loop ? "**on**" : "**off**"}`)
                    queue.textChannel.send(loopEmbed).catch(console.error);
                    break;

                case "⏹":
                    reaction.users.remove(user).catch(console.error);
                    if (!canModifyQueue(member)) return;
                    queue.songs = [];
                    const stopEmbed = new MessageEmbed()
                        .setColor(0xffd1dc)
                        .setDescription(`${user.username} stopped the music!`)
                    queue.textChannel.send(stopEmbed).catch(console.error);
                    try {
                        queue.connection.dispatcher.end();
                    } catch (error) {
                        console.error(error);
                        queue.connection.disconnect();
                    }
                    collector.stop();
                    break;

                default:
                    reaction.users.remove(user).catch(console.error);
                    break;
            }
        });

        collector.on("end", () => {
            playingMessage.reactions.removeAll().catch(console.error);
            if (PRUNING && playingMessage && !playingMessage.deleted) {
                playingMessage.delete({ timeout: 3000 }).catch(console.error);
            }
        });
    }
};