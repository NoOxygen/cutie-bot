exports.run = (client, message) => {
    let staffRole = message.guild.roles.cache.find(role => role.name === "staff").id;

    if (!message.channel.name.includes("ticket-")) return message.channel.send("You cannot use that here!")
    message.channel.overwritePermissions([{
            id: message.guild.id,
            deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
        },
        {
            id: staffRole,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
        }
    ]);
    message.channel.send("This channel has been archived for staff to check for any rule-breaking. Once it has been checked, the staff is expected to manually close the channel using `qt modclose`")
    var name = message.author.id;
    exports.name = name;
}