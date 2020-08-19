module.exports = client => {
  // set activity status
  client.user.setActivity(`qt help | v2.0`, {type: "LISTENING"});

  // tell host that bot is online
  console.log(`CUTIE v2.0 is now online`);
};
