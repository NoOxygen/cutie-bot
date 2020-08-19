module.exports = client => {
  // set activity status
  client.user.setActivity(`qt help | v1.2`, {type: "LISTENING"});

  // tell host that bot is online
  console.log(`CUTIE v1.2 is now online`);
};
