module.exports=(args,message,profile)=>{
    if(profile.lastTribute+12*3600000>Date.now()){
        message.channel.sendEm("You're already collected tribute! Try again in 12 hours")
    }else{
        let items=JSON.parse(fs.readFileSync("./items.json"))
        let canTribute=0
        Object.keys(profile.humans).forEach(key=>{
            canTribute+=items[key].workAbility*profile.humans[key]
            console.log(canTribute)
        })
        db.collection("profile").findOneAndUpdate({id:message.author.id},
            {$set:{money:profile.money+canTribute,lastTribute: Date.now()}
            })
        message.channel.sendEm("Collected "+canTribute+" dollars!")
    }
}