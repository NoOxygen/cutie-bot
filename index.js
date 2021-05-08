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
    let db = await client.birthdays.filter(p => p.timezone)
    for (ident of db) {

        // these two variables are used in both cases
        const sendGuild = ident[1]['guild'];
        console.log(sendGuild)
        const birthdayRole = await client.settings.get(`${sendGuild}.birthdayRole`);

        // user data we're targeting now
        const birthdayFolk = client.guilds.cache.get(sendGuild).members.cache.get(ident[1]['username']);

        // if statement for setting the role
        if (moment().tz(ident[1]['timezone']).format('DD-MMM') === ident[1]['date']) {
            // set role and send message
            if (!birthdayFolk.roles.cache.get(birthdayRole)) {
                birthdayFolk.roles.add(birthdayRole);

                // get the channel where to send a message
                const msgChannel = await client.settings.get(`${sendGuild}.birthdayChnl`);
                client.channels.cache.get(msgChannel).send(`Happy Birthday, <@${ident[1]['username']}>`)
            }
        } else { // else remove the role
            if (birthdayFolk.roles.cache.get(birthdayRole)) {
                birthdayFolk.roles.remove(birthdayRole);
            }
        }
    }
}, 900000);

client.login(config.token);