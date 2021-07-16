exports.run = (client, message, args) => {
  var breathe_gif = [
  "https://media.giphy.com/media/krP2NRkLqnKEg/200.gif",
  "https://www.duffthepsych.com/wp-content/uploads/2016/07/478Breathe500x500c129revised.gif",
  "https://media.giphy.com/media/PqleouQXdpCfu/giphy.gif"
  ];
  var gif = Math.floor(Math.random() * breathe_gif.length);
  message.channel.send(breathe_gif[gif]);
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: "User"
};

exports.help = {
	name: "breathe",
	category: "Miscellaneous",
	description: "Sends a gif to breathe along to",
	usage: "breathe"
};