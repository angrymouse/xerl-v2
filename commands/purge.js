module.exports=(args,message)=>{
  if(!args[0]||isNaN(Number(args[0]))){
    return message.channel.send(
      new Discord.RichEmbed()
      .setColor("RED")
      .setDescription("Pls, don't break our servers. This command need one argument (Number of messages to delete)")
      .setAuthor("Xerl Error Message",client.user.avatarURL)
      .setThumbnail(client.user.avatarURL)
      .addField(
        "What? What i need use as first argument to get normal result?",
        "You need to use number of messages to delete."
      )
    )
  }else{
    let mtd=Number(args[0])
    message.channel.bulkDelete(mtd).then(() => {
      message.channel.send("Deleted "+mtd+" messages.").then(msg => msg.delete(3000));
    })
}
}
