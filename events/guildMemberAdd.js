module.exports = (client, member) => {
	const { MessageEmbed } = require("discord.js");
	const moment = require("moment-timezone");
	actionDate = moment(Date.now()).format('hh:mm DD/MM/YYYY')
  var role = member.guild.roles.cache.find(role => role.name == 'unverified')
  if (!role) {
    member.guild.roles.create({
      data: {
        name: "unverified",
        mentionable: false,
      }
    }).then(function(role) {
      member.roles.add(role);
    }).catch(console.error);
  } else {
    member.roles.add(role).catch(console.error);
  }
  const key = `${member.guild.id}`

	const embed = new MessageEmbed()
		.setColor(0xffd1dc)
		.setDescription(`${member.user} joined the server`)
		.setFooter(`${actionDate}`)

	const sendChnl = client.logger.get(key, "logChnl")
	client.channels.cache.get(sendChnl).send(embed).catch(console.error);
};
