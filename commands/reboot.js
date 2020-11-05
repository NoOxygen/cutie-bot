exports.run = async(client, message, args, level) => { // eslint-disable-line no-unused-vars
	if(!message.member.hasPermission('ADMINISTRATOR'))
    return;
	await message.reply("Bot is shutting down.");
	client.commands.forEach(async cmd => {
		await client.unloadCommand(cmd);
	});
	process.exit(1);
};
