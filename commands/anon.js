exports.run = (client, message, [chnl, ...confession]) => {
  if(message.channel.type === 'dm') {
    const { Client, MessageEmbed } = require('discord.js');
    const moment = require("moment-timezone");
    actionDate = moment(message.createdTimestamp).format('hh:mm DD/MM/YYYY')
    const paramChnl = parseInt(chnl);
    const anonChannel = client.channels.cache.find(c=>["anon-support", "mental-health-support"].includes(c.name)).id;
    const tee = parseInt(anonChannel)

    const embed = new MessageEmbed()
      .setColor(0xffd1dc)
      .setDescription(`${confession.join(" ")}`)
      .setFooter(`${actionDate}`)
    if (paramChnl === tee){
      client.channels.cache.get(anonChannel).send(embed)
    }
  }
}
