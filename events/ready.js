module.exports = client => {
  // set activity status
  client.user.setActivity(`qt help | v2.2`, {type: "LISTENING"});

  // tell host that bot is online
  console.log(`CUTIE v2.2 is now online`);
};
