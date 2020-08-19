module.exports = client => {
  // set activity status
  client.user.setActivity(`qt help | v1.3`, {type: "LISTENING"});

  // tell host that bot is online
  console.log(`CUTIE v1.3 is now online`);
};
