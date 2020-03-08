module.exports=(args,message,profile)=>{
    if(!profile.lastBump||Date.now()>profile.lastBump+18000000){
        db.collection("distopp-guilds").findOne({id:message.guild.id},(err,g)=>{
            if(g!=null){
                db.collection("distopp-guilds").findOneAndUpdate({id:message.guild.id},{$set:{bumps:g.bumps+1}})
                message.channel.sendEm("Successfully bumped!")
            }else{
                message.channel.sendEm("This guild isn't listed on distopp!")
            }
        })
        db.collection("profile").findOneAndUpdate({id:profile.id},{$set:{lastBump:Date.now()}})

    }else{
        message.channel.sendEm("You already bumped a guild! Please wait 4 hours and try again!")
    }
}