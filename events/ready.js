module.exports = client => {
  // set activity status
  client.user.setActivity(`qt help | v2.3.1`, {type: "LISTENING"});

  // tell host that bot is online
  console.log(`CUTIE v2.3.1 is now online`);
};
