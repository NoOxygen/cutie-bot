exports.run = (client, message, args) => {
  if (message.member.hasPermission('ADMINISTRATOR')) {
    let props = require(`./${args[0]}.js`);
    // Get just the command name from the file name
    let commandName = args[0];
    console.log(`Attempting to load command ${commandName}`);
    // Here we simply store the whole thing in the command Enmap. We're not running it right now.
    client.commands.set(commandName, props);
  }
}
