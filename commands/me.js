module.exports=(args,message,profile)=>{


            profile.army=Object.keys(profile.army).join(" ")
    let hr=""
    Object.keys(profile.humans).forEach(human=>{
        hr+=human+" - "+profile.humans[human]+"\n"
    })
    profile.humans=hr
    let emb=new Discord.RichEmbed()
        .setAuthor("Xerl V2.0",client.user.avatarURL)
        .setColor("GREEN")
        .setFooter("©️ Mice Version X 2019-2020")
        .addField("Army",profile.army)
        .addField("Humans",profile.humans)
        .addField("Money",profile.money)
message.channel.send(
emb
)
}