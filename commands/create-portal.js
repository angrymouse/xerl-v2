
module.exports=async (args,message)=>{
    if(!message.member.hasPermission("ADMINISTRATOR")){
       return message.channel.sendEm("You must be administrator to create portals!")
    }
    if(!message.guild.me.hasPermission("ADMINISTRATOR")){
       return message.channel.sendEm("I must be administrator to create portals!")
    }else{
     let pi= await message.channel.createMC(message.member,"Okay! Provide ID for this portal:")
         pi=pi.toLowerCase()
          let pc=await message.guild.createChannel(pi+" Portal")
     let p=await db.collection("portals").insertOne({guild:message.guild.id,channel:pc.id,portal:pi})
        message.channel.sendEm("Portal "+pi+" created successfully!")
        message.channel.send("<#"+pc.id+">")
        portal.push({guild:message.guild.id,channel:pc.id,portal:pi})
        portals.on(pi + "-message", async (message, params) => {
            let pc = client.channels.get(p.channel)
            if(!pc){return db.collection("portals").deleteOne({_id:p._id})}
            if (message.channel.id === pc.id) {
                return
            }
            let wh = await pc.fetchWebhooks()
            wh = wh.first()
            if (!wh) {
                wh = await pc.createWebhook("Xerl Portal", client.user.avatarURL)
            }
            let emb=new Discord.RichEmbed()
                .setColor("#2f3136")
                .setDescription(message.content)
                .setFooter("From " + message.guild.name)
            //console.log(emb)
            await wh.send({embeds:[emb],username:message.author.tag,avatarURL:message.author.avatarURL})
            let files=[]
            message.attachments.forEach((fil)=>{files.push(fil.url)})
            if(files.length>0){
                wh.send({files:files})
            }
        })
        portals.on(pi + "-edit", async (was,message) => {
            let pc = client.channels.get(p.channel)
            if(!pc){return db.collection("portals").deleteOne({_id:p._id})}
            if (message.channel.id === pc.id) {
                return
            }
            let wh = await pc.fetchWebhooks()
            wh = wh.first()
            if (!wh) {
                wh = await pc.createWebhook("Xerl Portal", client.user.avatarURL)
            }
            let emb=new Discord.RichEmbed()
                .setColor("#2f3136")
                .setTitle("Edit")
                .addField("Was",was.content,true)
                .addField("Now",message.content,true)
                .setFooter("From " + message.guild.name)
            //console.log(emb)
            await wh.send({embeds:[emb],username:message.author.tag,avatarURL:message.author.avatarURL})
            let files=[]
            message.attachments.forEach((fil)=>{files.push(fil.url)})
            if(files.length>0){
                wh.send({files:files})
            }
        })
    }
}
