module.exports = client => {
  // set activity status
  client.user.setActivity(`qt help | v1.1`, {type: "LISTENING"});

  // tell host that bot is online
  console.log(`CUTIE v1.1.0 is now online`);
};
