exports.run = async(client, message, args, level) => { // eslint-disable-line no-unused-vars
    if (!message.member.hasPermission('ADMINISTRATOR'))
        return;

    if (message.mentions.members.size === 0)
        return message.reply("please mention a user to kick");

    let verifyMember = message.mentions.members.first();

    verifyMember.roles.remove(message.guild.roles.cache.find(role => role.name === "unverified"))
    verifyMember.roles.add(message.guild.roles.cache.find(role => role.name === "member"))
    verifyMember.roles.add(message.guild.roles.cache.find(role => role.name === "verified"))

    if (args[0] === "18") {
        verifyMember.roles.add(message.guild.roles.cache.find(role => role.name === "senior citizen"))
    }

}