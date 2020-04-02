module.exports=async (args,message)=>{
    if(message.guild.owner.id!=message.member.id){
        return message.channel.sendEm("Only server owners can apply promocodes!")
    }else if(message.guild.memberCount<65){
       return  message.channel.sendEm("Your server must have at least 65 members!")
    }

    db.collection('promo-accepts').findOne({id:message.author.id},async (err,doc)=>{
if(doc!==null){
    return message.channel.sendEm("You're already accepted another promo code! ("+doc.promo+")")
}else{
    db.collection('promo').findOne({code:args[0]},async (err,promo)=>{
        if(promo==null){
            message.channel.sendEm("There isn't promo with this code!")
        }else{
            db.collection("promo-accepts").insertOne({id:message.author.id,promo:promo.code})
           let user= await client.fetchUser(promo.from)
            message.channel.sendEm("You're accepted promo "+promo.code+" from "+user.tag+" just now!")
            db.collection("promo").updateOne({promo:promo.code},{$set:{uses:promo.uses+1}})
        }
    })
}
    })
}
