module.exports=(args,message)=>{
    if(!message.member.hasPermission("ADMINISTRATOR")){
        message.channel.sendEm("Sorry, only guild admins can add it to distopp.")
    }else{
        db.collection("distopp-guilds").findOne({id:message.guild.id},(err,g)=>{
            if(g==null){
                message.channel.createInvite({temporary:false,maxAge:0,maxUses:0,unique:true,reason:"Distopp invite"}).then(inv=>{
                    db.collection("distopp-guilds").insertOne({
                        id:message.guild.id,
                        invite:inv.code,
                        description:"Absolutely Cool Guild!",
                        bumps:1
                    })
                })
                message.channel.sendEm("Successfully added to Distopp!")
            }else{
                message.channel.sendEm("This guild already added to Distopp!")
            }
        })

    }
}