module.exports = client => {
  // set activity status
  client.user.setActivity(`qt help | v3.5`, {type: "LISTENING"});

  // tell host that bot is online
  console.log(`CUTIE v3.5 is now online`);
};
