module.exports=(args,message)=>{
  if(!args[0]){
    args[0]="help"
  }
  //console.log()
  if(fs.existsSync(process.cwd()+"/descriptions/"+args[0]+".txt")){
      let emb=new Discord.RichEmbed()
      .setColor("RANDOM")
      .setAuthor("Xerl Help",client.user.avatarURL)
      .setThumbnail(client.user.avatarURL)
      .setTitle(args[0]+" description")
      .setDescription(fs.readFileSync(process.cwd()+"/descriptions/"+args[0]+".txt", "utf8"))
      if(args[0]=="help"){
        emb.addField(
              "Okay, i can get info about commands, but where is list of supported commands?",
              "If you want to get list of all supported commands just type command ``-commands``."
              )
      }
      message.channel.send(emb)
  }else{
    message.channel.send(
      new Discord.RichEmbed()
      .setColor("RED")
      .setAuthor("Xerl Error Message",client.user.avatarURL)
      .setThumbnail(client.user.avatarURL)
      .setTitle("Manual not found")
      .setDescription("Sorry, there isn't manual for \""+args[0]+"\" command.\nMaybe you provided a non-existing command? Type -commands for the full list of avalible commands")
    )
  }
}
