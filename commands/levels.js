exports.run = async(client, message) => {
    const { Client, MessageEmbed } = require('discord.js');
    const hastebin = require("hastebin-gen");

    var filtered = await client.points.filter(p => p.guild === message.guild.id).getMany(client.points.all);
    var sorted = filtered.sort((a, b) => b.points - a.points);

    let ldrbrd = [];

    for (const data of sorted) {
        ldrbrd.push(`${data.username}, ${data.points} points (level ${data.level})`);
    }

    let doge = ldrbrd.join("\n");

    hastebin(doge, { extension: "txt" }).then(haste => {
        message.channel.send(`Here's ${message.guild.name}'s full leaderboard: ${haste}`);
    }).catch(error => {
        console.error(error);
    });

}