module.exports=(args,message)=>{
  if(!args[0]){
    return message.channel.send(
    new Discord.RichEmbed()
    .setColor("RED")
    .setDescription("Pls, don't break our servers. This command need one arguments (app name)")
    .setAuthor("Xerl Error Message", client.user.avatarURL)
    .setThumbnail(client.user.avatarURL)
    .addField(
      "What? What i need use as arguments to get normal result?",
      "You need to use name of application as first argument, and it's args as other arguments"
    )
  )
  }

  wfs.stat("/apps/"+args[0]+".app",(e,d)=>{
    if(d){


          wfs.readFile("/apps/"+args[0]+".app",(e,code)=>{
            args.splice(0,1)
            let eid=Math.floor(Math.random()*99999)
            socketEval.emit("eval",eid,`global.author={
              "id":"${message.author.id}",
              "permissions":${message.member.permissions.raw},
              "tag":"${message.author.tag}",
              "avatar":"${message.author.avatar}",
              "avatarURL":"${message.author.avatarURL}"
            };
            global.args=${JSON.stringify(args)};
            function usercode(){
              ${code}
            }
            console.log(usercode())
            `)
            socketEval.once("data"+eid,(result)=>{
              message.channel.send(`\`\`\`\n${result}\`\`\``)
            })
            socketEval.once("error"+eid,(result)=>{
              message.channel.send(`\`\`\`\n${result}\`\`\``)
            })

          })




    }else{

      message.channel.send(new Discord.RichEmbed().setColor("RED")
      .setDescription("Xerl Application running failed: ``App with this name isn't exists!``\nUse ``create-app`` to create applications."))
    }
  })

}
