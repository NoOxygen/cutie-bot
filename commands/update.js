exports.run = async(client, message, args, level) => { // eslint-disable-line no-unused-vars
	if(!message.member.hasPermission('ADMINISTRATOR'))
    return;
	const sh = require('shelljs');

  var output = sh.exec('git pull').stdout;
	message.channel.send("```" + output + "```")
	sh.exec('npm install')
};
