exports.run = async(client, message, args) => {
    // Limited to mods- adjust to your own preference!
    if (!message.member.roles.cache.some(r => ["staff", "admin", "aide"].includes(r.name)))
        return message.reply("you can't use this command.");

    const user = message.mentions.users.first();
    if (!user) return message.reply("You must mention!");

    const pointsToAdd = parseInt(args[1], 10);
    if (!pointsToAdd)
        return message.reply("You didn't tell me how many points to give... :(")

    // Ensure there is a points entry for this user.
    await client.points.ensure(`${message.guild.id}-${user.id}`, {
        user: message.author.id,
        guild: message.guild.id,
        points: 0,
        level: 0
    });

    // Get their current points.
    let userPoints = await client.points.get(`${message.guild.id}-${user.id}.points`);
    userPoints += pointsToAdd;


    // And we save it!
    await client.points.set(`${message.guild.id}-${user.id}.points`, userPoints)

    message.channel.send(`${user.tag} has received ${pointsToAdd} points and now stands at ${userPoints} points.`);
}