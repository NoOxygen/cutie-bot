module.exports = client => {
    // set activity status
    client.user.setPresence({
        status: 'online',
        activity: {
            name: "r!help | v4",
            type: "LISTENING"
        }
    });

    // tell host that bot is online
    console.log(`TRC v4 is now online`);
};
