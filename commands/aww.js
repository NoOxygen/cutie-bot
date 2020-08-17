exports.run = (clients, message, args) => {
  var ash = [
  "https://i.imgur.com/nLszRgd.gif",
	"https://cdn.discordapp.com/attachments/744188771318235196/744202163885965362/9l1A4OS.png",
	"https://imgur.com/gallery/1SSVsBH",
	"https://cdn.discordapp.com/attachments/744188771318235196/744202357923119124/JXetxQh.png",
	"https://imgur.com/gallery/O3EIPHp",
	"https://imgur.com/Z3mpeUB",
  "https://i.redd.it/xzbzfeaes2h51.jpg",
	"https://i.imgur.com/INGQqID.jpg",
	"https://i.imgur.com/RUq7Mwd.jpg",
	"https://i.imgur.com/6cqHZOd.jpg",
	"https://i.imgur.com/5tYFEx0.jpg",
  "https://i.redd.it/mcvupw93xzg51.jpg"
  ];
  var aww = Math.floor(Math.random() * ash.length);
  message.channel.send(ash[aww]);
}
