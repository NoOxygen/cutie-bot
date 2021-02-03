exports.run = async(client, message, args, level) => { // eslint-disable-line no-unused-vars
    if (!message.member.hasPermission('ADMINISTRATOR'))
        return;
    const fs = require('fs');

    if (args[0] === 'idle') {
        fs.copyFile('./commandStorage/idle.js', './events/ready.js', (err) => {
            if (err) throw err;
        });
        client.commands.forEach(async cmd => {
            await client.unloadCommand(cmd);
        });
        process.exit(1);
    } else if (args[0] === 'dnd') {
        fs.copyFile('./commandStorage/dnd.js', './events/ready.js', (err) => {
            if (err) throw err;
        });
        client.commands.forEach(async cmd => {
            await client.unloadCommand(cmd);
        });
        process.exit(1);
    } else if (args[0] === 'invisible') {
        fs.copyFile('./commandStorage/invisible.js', './events/ready.js', (err) => {
            if (err) throw err;
        });
        client.commands.forEach(async cmd => {
            await client.unloadCommand(cmd);
        });
        process.exit(1);
    } else if (args[0] === 'online') {
        fs.copyFile('./commandStorage/online.js', './events/ready.js', (err) => {
            if (err) throw err;
        });
        client.commands.forEach(async cmd => {
            await client.unloadCommand(cmd);
        });
        process.exit(1);
    } else return;
};