exports.run = async(client, message, args, level) => { // eslint-disable-line no-unused-vars
	if(!message.member.hasPermission('ADMINISTRATOR'))
    return;
	const sh = require('shelljs');

	sh.exec('git pull && npm install')
};
