module.exports=(args,message)=>{
  //global.jimp=require('jimp');
  //console.log(message.attachments.first());
  if(!message.attachments.first()&&!message.mentions.members.first()){
    return message.channel.send(

      new Discord.RichEmbed()
      .setColor("RED")
      .setDescription("Pls, don't break our servers. This command need one attachment (Image to processing)")
      .setAuthor("Xerl Error Message", client.user.avatarURL)
      .setThumbnail(client.user.avatarURL)
      .addField(
        "What? What i need use as first attachment to get normal result?",
        "You need to use image with any resolution"
      )
    )
  }
  let url
  if(!message.attachments.first()){

  url=message.mentions.members.first().user.avatarURL
  }else{
  url=message.attachments.first().url
  }

  jimp.read(url).then(image=>{


    let cf=communismFlag.clone()
    cf.fade(0.5);

    cf.resize(image.bitmap.width,image.bitmap.height)
    image.blit(cf,0,0)
    image.getBuffer(jimp.MIME_PNG, (err,ib)=>{
    let fid=makeid(10)+".png"
      fs.writeFile(fid,ib,()=>{
        message.channel.send("",{files:[{attachment:fid,name:fid}]}).then(()=>{
          fs.unlinkSync(fid)
        })
      })
    })


})
}
