const Discord = require("discord.js");
const Enmap = require("enmap");
const Josh = require("@joshdb/core");
const provider = require("@joshdb/mongo");
const fs = require("fs");
const client = new Discord.Client({ partials: ["MESSAGE", "USER", "REACTION"] });
const config = require("./config.json");

const { play } = require("./include/play");
const { YOUTUBE_API_KEY } = require("./config.json");
const ytdl = require("ytdl-core");
const YouTubeAPI = require("simple-youtube-api");
const youtube = new YouTubeAPI(YOUTUBE_API_KEY);

client.queue = new Map();
client.past = new Map();

client.mongoUrl = fs.readFileSync('./commandStorage/mongoUrl.txt').toString()

// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;
client.points = new Josh({
    name: 'Cutie',
    provider,
    providerOptions: {
        collection: "points",
        dbName: "Cutie",
        url: client.mongoUrl
    }
});
client.settings = new Josh({
    name: 'Cutie',
    provider,
    providerOptions: {
        collection: "settings",
        dbName: "Cutie",
        url: client.mongoUrl
    }
});

client.birthdays = new Josh({
    name: 'Cutie',
    provider,
    providerOptions: {
        collection: "birthdays",
        dbName: "Cutie",
        url: client.mongoUrl
    }
});

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));
    });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        // Load the command file itself
        let props = require(`./commands/${file}`);
        // Get just the command name from the file name
        let commandName = file.split(".")[0];
        console.log(`Attempting to load command ${commandName}`);
        // Here we simply store the whole thing in the command Enmap. We're not running it right now.
        client.commands.set(commandName, props);
    });
});


const { setIntervalAsync } = require('set-interval-async/dynamic')

setIntervalAsync(async() => {
        const moment = require("moment-timezone")
        let month = moment().format('Do MMMM')
        let db = await client.birthdays.filter(p => p.timezone)
        for (ident of db) {
            if (moment().tz((`${ident[1]['timezone']}`)).format(`Do MMMM`) !== `${ident[1]['date']}`) {
                const sendGuild = `${ident[1]['guild']}`
                const birbdayRole = await client.settings.get(`${sendGuild}.birthdayRole`)
                let roleRemove = client.guilds.cache.get(sendGuild).roles.cache.get(birbdayRole)
                let toRemove = roleRemove.members.map(m => m.user.id);
                for (person of toRemove) {
                    client.guilds.cache.get(sendGuild).members.cache.get(person).roles.remove(birbdayRole)
                }
            }
            if (moment().tz((`${ident[1]['timezone']}`)).format(`Do MMMM`) === `${ident[1]['date']}`) {
                const sendGuild = `${ident[1]['guild']}`
                const birbdayFolk = `${ident[1]['username']}`
                const msgChannel = await client.settings.get(`${sendGuild}.birthdayChnl`)
                const birbdayRole = await client.settings.get(`${sendGuild}.birthdayRole`)

                birbdayAt = `<@${birbdayFolk}>`
                let birbdayFolk2 = client.guilds.cache.get(sendGuild).members.cache.get(birbdayFolk);
                if (client.guilds.cache.get(sendGuild).members.cache.get(birbdayFolk).roles.cache.get(birbdayRole)) {
                    continue
                }
                birbdayFolk2.roles.add(birbdayRole)
                client.channels.cache.get(msgChannel).send(`Happy birthday, ${birbdayAt} :)`)
            }
        }
    },
    1800000)

client.login(config.token);