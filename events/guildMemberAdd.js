module.exports = (client, member) => {
  var role = member.guild.roles.cache.find(role => role.name == 'unverified')
  if (!role) {
    member.guild.roles.create({
      data: {
        name: "unverified",
        mentionable: false,
      }
    }).then(function(role) {
      member.roles.add(role);
    }).catch(console.error);
  } else {
    member.roles.add(role).catch(console.error);
  }
};
