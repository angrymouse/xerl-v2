module.exports=async (args,message)=>{
    db.collection('promo').findOne({from:message.author.id},(err,doc)=>{
        if(!doc){
            let code=makeid(20)
            db.collection("promo").insertOne({uses:0,from:message.author.id,code:code})
            message.channel.sendEm("Your code: "+code+"\n Your money:0 RUB")
        }else{
            db.collection('promo-accepts').find({promo:doc.code}).toArray((err,promos)=>{
                message.channel.sendEm("Your code: "+doc.code+"\nYour money:"+promos.length*0.33+"RUB")
            })

        }
    })
}
