module.exports=async (args,message)=>{
    if(!args[0]){args[0]=message.author.id}else{
        if(message.mentions.members.first()){args[0]=message.mentions.members.first().id}
    }
    let user=await client.fetchUser(args[0])
    let uprof= await require("../utils/geteconomy")(message.guild.id, message.author.id,message.channel.id)

    let gshop=await require("../utils/getshop")(message.guild.id)
    await message.channel.send(new Discord.RichEmbed()
        .setAuthor(user.username+"'s profile",user.avatarURL)
        .setFooter("©️ MiceVersionX 2018-2020")
        .setColor("#2f3136")
        .addField("Money",uprof.money+gshop.wallet,true)
        .addField("XP",uprof.xp,true)
        .addField("Rank",uprof.rank,true)
    )
}
