exports.run = (client, message, args) => {
  const mmbr = message.guild.member(message.author);
  if (mmbr == client.user) return;

  let clr = message.content.split(" ").pop(); if (clr.startsWith('#')) clr = clr.substr(1);
  if (clr === 'random') {
    clr = Math.floor(Math.random() * (0xFFFFFF + 1));
  } else if (isNaN(parseInt(clr, 16))) {
    throw "Out of range/isNaN\n" + parseInt(clr, 16) + '\n' + clr;
  };

    if (mmbr.roles.cache.find(a => a.name.endsWith(' col'))) { // change the color of the existing col role
        mmbr.roles.cache.find(a => a.name.endsWith(' col')).edit({
          name: clr + ' col',
          color: clr
        }).catch(console.error);
        message.channel.send(`${mmbr.displayName}, color changed!`)
    }
    else { //create and assign a role
      message.guild.roles.create({
        data: {
          name: clr + ' col',
          color: clr,
          mentionable: false,
          position: message.guild.me.roles.highest.position
        }
      }).then(function(role) {
        mmbr.roles.add(role);
        message.channel.send(`${mmbr.displayName}, color assigned!`)
      }).catch(console.error);
    }
  }
