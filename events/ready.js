module.exports = client => {
  // set activity status
  client.user.setActivity(`qt help | v3.4.u`, {type: "LISTENING"});

  // tell host that bot is online
  console.log(`CUTIE v3.4.u is now online`);
};
