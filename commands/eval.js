module.exports = (args,message)=>{
  if(message.author.id=="343046183088029696"){
  try {
    let result=eval(args.join(" "))
    message.channel.send(`\`\`\`js\n${result}\`\`\``)
  } catch (err) {
message.channel.send(`\`\`\`js\n${err}\`\`\``)
  }
}
};
