module.exports = client => {
    // set activity status
    client.user.setPresence({
        status: 'online',
        activity: {
            name: "qt help | v3.6",
            type: "LISTENING"
        }
    });

    // tell host that bot is online
    console.log(`CUTIE v3.6 is now online`);
};