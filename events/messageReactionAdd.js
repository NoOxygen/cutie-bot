module.exports = async (client, reaction, user) => {
  const Discord = require("discord.js");
  const ticCat = client.channels.cache.find(c=>["ticket support", "tickets"].includes(c.name)).id

  if(user.partial) await user.fetch();
  if(reaction.partial) await reaction.fetch();
  if(reaction.message.partial) await reaction.message.fetch();

  if(user.bot) return;

  let ticketid = await client.settings.get(`${reaction.message.guild.id}-ticket`);

  if(!ticketid) return;

  if(reaction.message.id == ticketid && reaction.emoji.name == '🎫') {
      reaction.users.remove(user);
      reaction.message.guild.channels.create(`ticket-${user.username}`, {
        parent: `${ticCat}`,
        type: 'text'
      }).then(channel => {
          channel.send(new Discord.MessageEmbed().setTitle("Welcome to your ticket!").setDescription("Thanks for trying out our ticket support system. You've opened a ticket, which creates this channel that will last as long as you need it to. When your support conversation is done, please use the command `qt close` to close the channel.").setColor(0xffd1dc))
          channel.lockPermissions()
      })
  }
}
