module.exports = client => {
    // set activity status
    client.user.setPresence({
        status: 'online',
        activity: {
            name: "qt help | v4",
            type: "LISTENING"
        }
    });

    // tell host that bot is online
    console.log(`CUTIE v4 is now online`);
};