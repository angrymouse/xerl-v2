module.exports=(args,message)=>{
  //global.jimp=require('jimp');
  //console.log(message.attachments.first());
  if(!message.attachments.first()){
    return message.channel.send(

      new Discord.RichEmbed()
      .setColor("RED")
      .setDescription("Pls, don't break our servers. This command need one attachment (File to host)")
      .setAuthor("Xerl Error Message", client.user.avatarURL)
      .setThumbnail(client.user.avatarURL)
      .addField(
        "What? What i need use as first attachment to get normal result?",
        "You need to use any static document. It will be hosted on our servers."
      )
    )
  }


  wfs.stat("/host/"+message.author.id,(e,d)=>{
    if(!d){wfs.mkdir("/host/"+message.author.id,()=>{
      request.get(message.attachments.first().url,{encoding:null},(err,res,cnt)=>{
        wfs.writeFile("/host/"+message.author.id+"/"+message.attachments.first().filename,cnt,null)
      })

    })}else{
      request.get(message.attachments.first().url,{encoding:null},(err,res,cnt)=>{
        wfs.writeFile("/host/"+message.author.id+"/"+message.attachments.first().filename,cnt,null)
      })
    }
    message.channel.send(new Discord.RichEmbed().setColor("BLUE")
    .setDescription("Uploaded file to Xerl Host successfully!\nLink: https://xer.l.co.ua/host/"+message.author.id+"/"+message.attachments.first().filename))
  })



}
