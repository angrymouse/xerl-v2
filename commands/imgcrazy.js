module.exports=(args,message)=>{
  //global.jimp=require('jimp');
  //console.log(message.attachments.first());
  if(!message.attachments.first()){
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
  jimp.read(message.attachments.first().url).then(image=>{
    let af=message.attachments.first()
    for (let i = 0; i < Math.rand(10,20); i++) {
    let ic=image.clone()
    let size=Math.rand(10,af.width)
    ic.rotate(Math.rand(0,360))
    ic.resize(size,size);
    image.blit(ic,Math.rand(-af.width/2,af.width),Math.rand(-af.height/2,af.height))
    }

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
