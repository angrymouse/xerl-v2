db.collection("portals").find().toArray((err, doc) => {
    global.portal = doc
    portal.forEach(p => {
        portals.on(p.portal + "-message", async (message, params) => {
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
        portals.on(p.portal + "-edit", async (was,message) => {
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
    })
    //client.channels.get("690361665828421701").sendEm(JSON.stringify(doc))
    client.on("message", message => {
        if (message.author.bot || !message.guild) {
            return
        }
        let gp = portal.find(p => {
            return message.guild.id == p.guild && message.channel.id == p.channel
        })
        if (gp) {
            let files = []
            message.attachments.forEach((f)=>{files.push(f.url)})

            portals.emit(gp.portal + "-message", message)

        }
    })
    client.on("messageUpdate", (was,message) => {
        if (message.author.bot || !message.guild) {
            return
        }
        let gp = portal.find(p => {
            return message.guild.id == p.guild && message.channel.id == p.channel
        })
        if (gp) {
            let files = []
            message.attachments.forEach((f)=>{files.push(f.url)})

            portals.emit(gp.portal + "-edit", was,message)

        }
    })
})
