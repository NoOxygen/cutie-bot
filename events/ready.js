module.exports = client => {
  // set activity status
  client.user.setActivity(`qt help | v3.0`, {type: "LISTENING"});

  // tell host that bot is online
  console.log(`CUTIE v3.0 is now online`);
};
