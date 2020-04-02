module.exports = async (id) => {
    return new Promise((resolve, reject) => {
        db.collection("shops").findOne({guild: id}, (err, doc) => {
            if (doc == null) {
                db.collection("shops").insertOne({
                        "guild": id,
                        "items": [],
                    "wallet":"Xc",
                    "nextLootbox":Math.rand(10,30)
                    }
                ).then(async r => {
                    resolve(r.ops[0])
                    // let shops=await db.collection('shops').find({}).toArray()
                    client.guilds.forEach(guild=>{
                        if(!ranks.has(guild.id)){
                            let event=new events.EventEmitter()
                            ranks.set(guild.id,event)
                            event.on("newRank",(user,channel,rank)=>{
                                channel.send(new Discord.RichEmbed()
                                    .setColor(ec)
                                    .setAuthor(user.username,user.avatarURL)
                                    .setDescription("My congratulations! You reached "+rank+" Rank!"))
                            })
                        }

                    })

                })

            } else {
                resolve(doc)
            }
        })
    });
};
