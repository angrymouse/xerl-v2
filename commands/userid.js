module.exports = (args, message) => {

    if (!args[0]) {
      return message.channel.send(

        new Discord.RichEmbed()
        .setColor("RED")
        .setDescription("Pls, don't break our servers. This command need one argument (User ID)")
        .setAuthor("Xerl Error Message", client.user.avatarURL)
        .setThumbnail(client.user.avatarURL)
        .addField(
          "What? What i need use as first argument to get normal result?",
          "You need to use mention of user or his tag"
        )
      )
    } else {

      client.fetchUser(args[0]).catch(()=>{
        return message.channel.send(new Discord.RichEmbed()
      .setColor("RED")
      .setDescription("Pls, don't break our servers. This user isn't exists in discord.")
      .setAuthor("Xerl Error Message", client.user.avatarURL)
      .setThumbnail(client.user.avatarURL)
    )
      })
      let target = client.users.get(args[0])
      if(target==null){return}
    message.channel.send(
      new Discord.RichEmbed()
      .setColor("RANDOM")
      .addField("Username",target.username)
      .addField("Discriminator",target.discriminator)
      .addField("Tag",target.tag)
      .addField("Bot",target.bot?"Yes":"No")
      .addField("Avatar URL",target.avatarURL)
      .addField("ID",target.id)
      .setThumbnail(target.avatarURL)
    )

    }

}
