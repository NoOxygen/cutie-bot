module.exports = async(client, message) => {
    // Ignore all bots
    if (message.author.bot) return;

    if (message.content.toLowerCase().includes("thanks cutie"))
        message.channel.send("You're Welcome! :purple_heart:"); //You're Welcome! :heart:
    if (message.content.toLowerCase().includes("sorry cutie"))
        message.channel.send("It's ok fren :purple_heart:"); //It's ok fren :purple_heart:
    if (message.content.toLowerCase().includes("happy birthday cutie"))
        message.channel.send("Thanks fren! :cake: :purple_heart:");
    if (message.content.toLowerCase().includes("love you cutie"))
        message.channel.send("I love you too fren :purple_heart:");

    // if (message.content.includes("discord.gg") || message.content.includes("discordapp.com/invite") || message.content.includes("discord.com/invite")) {
    //   message.delete()
    // }

    if (message.channel.type === 'dm') {
        if (message.content.toLowerCase().includes("anon")) {} else {
            const cleverbot = require("cleverbot-free");

            // Without context
            cleverbot(`${message.content}`).then(response => message.channel.send(response));
        }
    }

    // If this is not in a DM, execute the points code.
    if (message.guild) {
        // We'll use the key often enough that simplifying it is worth the trouble.
        const key = `${message.guild.id}-${message.author.id}`;

        // Triggers on new users we haven't seen before.
        await client.points.ensure(`${message.guild.id}-${message.author.id}`, {
            user: message.author.id,
            guild: message.guild.id,
            points: 0,
            level: 0,
            username: message.member.user.tag
        });

        await client.settings.ensure(`${message.guild.id}`, {
            guild: message.guild.id,
            anonChnl: null,
            logChnl: null
        });

        if (message.content.length >= 7 && !message.content.startsWith(client.config.prefix)) {
            const oldP = await client.points.get(`${key}.points`)
            let newP = oldP + 1
            await client.points.set(`${key}.points`, newP);
        }


        // Calculate the user's current level
        const curLevel = Math.floor(0.1 * Math.sqrt(await client.points.get(`${key}.points`)));

        // Act upon level up by sending a message and updating the user's level in enmap.
        if (await client.points.get(`${key}.level`) < curLevel) {
            const botChannel = message.guild.channels.cache.find(channel => channel.name === "bot").id;
            if (!botChannel) return;
            client.channels.cache.get(botChannel).send(`<@${message.author.id}> leveled up to level **${curLevel}**! :)`);
            await client.points.set(`${key}.level`, curLevel);
        }
        if (await client.points.get(`${key}.level`) > curLevel) {
            const botChannel = message.guild.channels.cache.find(channel => channel.name === "bot").id;
            if (!botChannel) return;
            client.channels.cache.get(botChannel).send(`<@${message.author.id}> leveled down to level **${curLevel}** :(`);
            await client.points.set(`${key}.level`, curLevel);
        }
        if (await client.points.get(`${key}.level`) === 3) {
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
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

    // If that command doesn't exist, silently exit and do nothing
    if (!cmd) return;

    // Run the command
    cmd.run(client, message, args);
};