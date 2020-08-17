exports.run = (client, message, args) => {
  message.channel.send("You spoiler a post like this ``||example||`` (which becomes ||example||). Please add the relevant trigger warning outside of the spoilers as well, so people can avoid any specific trigger(s). \nType ``qt spoilers-guide`` for more information about when and where to use spoilers");
}
