module.exports = (args, message) => {
  if(!args[0]){
    message.channel.sendEm("This command needs at least one argument!")
  }else{
    message.channel.sendEm(args.join(" ").split("").reverse().join(""))
  }
}
