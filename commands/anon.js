exports.run = (client, message, [srvr, ...confession]) => {
  if(message.channel.type === 'dm') {
    const { Client, MessageEmbed } = require('discord.js');
    const moment = require("moment-timezone");
    actionDate = moment(message.createdTimestamp).format('hh:mm DD/MM/YYYY')

    const embed = new MessageEmbed()
      .setColor(0xffd1dc)
      .setDescription(`${confession.join(" ")}`)
      .setFooter(`${actionDate}`)


    const sendSrvr = client.confess.get(srvr, "guild").catch(console.error);
    const sendChnl = client.confess.get(srvr, "anonChnl").catch(console.error);

    if (srvr === sendSrvr){
      client.channels.cache.get(sendChnl).send(embed)
    }
  }
}
