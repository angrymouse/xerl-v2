module.exports=(args,message,profile)=>{
    if(args.length<5){
       return message.channel.sendEm("Too short description!")
    }
    if(!message.member.hasPermission("ADMINISTRATOR")){
        message.channel.send("Admin only!")
    }else{
        db.collection("distopp-guilds").findOne({id:message.guild.id},(err,g)=>{
            if(g!=null){
                db.collection("distopp-guilds").findOneAndUpdate({id:message.guild.id},{$set:{description:args.join(" ")}})
                message.channel.sendEm("Updated!")
            }else{
                message.channel.sendEm("This guild isn't listed on distopp!")
            }
        })
    }
}