exports.run = async(client, message, args, level) => { // eslint-disable-line no-unused-vars
	if(!message.member.hasPermission('ADMINISTRATOR'))
    return;
	const sh = require('shelljs');

  if(args[0] === 'force'){
		sh.exec('git reset --hard HEAD~10')
		var output = sh.exec('git pull').stdout;
		message.channel.send("```" + output + "```")
	} else if (args[0] === 'npm') {
		sh.exec('npm install')
	} else {
		var output = sh.exec('git pull').stdout;
		message.channel.send("```" + output + "```")
	}
};
