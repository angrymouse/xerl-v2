module.exports=(args,message)=>{
  if(!args[0]||isNaN(Number(args[0]))){
    return message.channel.send(
      new Discord.RichEmbed()
      .setColor("RED")
      .setDescription("Pls, don't break our servers. This command need one argument (Number of seconds to translate)")
      .setAuthor("Xerl Error Message",client.user.avatarURL)
      .setThumbnail(client.user.avatarURL)
      .addField(
        "What? What i need use as first argument to get normal result?",
        "You need to use number of seconds to translate into human readable format (Hours munutes seconds)"
      )
    )
  }else{
    let seconds=Number(args[0])
    let miliseconds=seconds*1000
    var hours = parseInt( seconds / 3600 ) ;
var minutes = parseInt( seconds / 60 ) % 60;
seconds = seconds % 60;

var pad = function(val){
  return val < 10 ?"0"+val:val;
}
if(hours<10){hours="0"+hours};if(minutes<10){minutes="0"+minutes};if(seconds<10){seconds="0"+seconds};
message.channel.send(
  new Discord.RichEmbed()
  .setColor("RANDOM")
  .setAuthor("Xerl Commands",[message.author.avatarURL,client.user.avatarURL].random())
  .setTitle("Result")
  .setDescription(`${hours} Hours ${minutes} Minutes ${seconds} Seconds (${hours}:${minutes}:${seconds})`)
  .addField("Note:",`If you are cyborg or machine, answer for you is ${miliseconds} miliseconds ;)`)
)
  }
}
