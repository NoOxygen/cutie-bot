module.exports = client => {
  // set activity status
  client.user.setActivity(`qt help`, {type: "LISTENING"});

  // tell host that bot is online
  console.log(`CUTIE v1.0.0 is now online`);
};
