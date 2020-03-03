module.exports=(args,message,profile)=>{
    if(!args[0]){
      return message.channel.sendEm("Please, specify item.")
    }
    let items=JSON.parse(fs.readFileSync("./items.json"))
    if(!items[args.join("").toLowerCase()]){
        return message.channel.sendEm("There isn't items with this name!")
    }
    let item=items[args.join("").toLowerCase()]
    let inm=args.join("").toLowerCase()
    if(profile.money >= item.cost){
        if(item.human){
            if(!profile.humans[inm]){
                profile.humans[inm]=1
            }else{
                profile.humans[inm]+=1
            }

        }
        if(!profile.army[inm]){
            profile.army[inm]=1
        }else{
            profile.army[inm]+=1
        }
        profile.money-=item.cost
        db.collection("profile").findOneAndUpdate({id:message.author.id},{
            $set:{
                army:profile.army,
                money:profile.money,
                humans:profile.humans
            }
        })
        message.channel.sendEm("Transaction success!")
    }else{
        message.channel.sendEm("Transaction failed!")
    }
   // message.channel.sendEm(JSON.stringify(items))
}
