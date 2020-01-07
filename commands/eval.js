module.exports = (args,message)=>{
  if(message.author.id=="343046183088029696"){
  try {
    let result=eval(args.join(" "))
    message.channel.send(`\`\`\`js\n${result}\`\`\``)
  } catch (err) {
message.channel.send(`\`\`\`js\n${result}\`\`\``)
  }
}else{
  let eid=Math.floor(Math.random()*99999)
  socketEval.emit("eval",eid,args.join(" "))
  socketEval.once("data"+eid,(result)=>{message.channel.send(`\`\`\`js\n${result}\`\`\``)})
  socketEval.once("error"+eid,(result)=>{message.channel.send(`\`\`\`js\n${result}\`\`\``)})

}
};
