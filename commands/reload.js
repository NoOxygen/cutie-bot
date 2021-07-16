exports.run = (client, message, args) => {
  if (message.member.hasPermission('ADMINISTRATOR')) {
    if(!args || args.length < 1) return message.channel.send("Must provide a command name to reload.");
    const commandName = args[0];
    // Check if the command exists and is valid
    if(!client.commands.has(commandName)) {
      return message.channel.send("That command does not exist");
    }
    // the path is relative to the *current folder*, so just ./filename.js
    delete require.cache[require.resolve(`./${commandName}.js`)];
    // We also need to delete and reload the command from the client.commands Enmap
    client.commands.delete(commandName);
    const props = require(`./${commandName}.js`);
    client.commands.set(commandName, props);
    message.channel.send(`The command ${commandName} has been reloaded`);
  } else {
    message.channel.send("I'm sure you didn't create me");
  }
}

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: [],
	permLevel: "Modmin"
};

exports.help = {
	name: "reload",
	category: "Modmin",
	description: "Reload a command to incorporate new changes",
	usage: "reload [command name]"
};