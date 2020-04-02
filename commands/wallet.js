module.exports = async (args, message) => {
    if (!message.member.hasPermission("ADMINISTRATOR") && message.author.id != "343046183088029696") {
        message.channel.sendEm("You must be ``GUILD ADMINISTRATOR`` to use this command.")
    } else {
        let shop = await require("../utils/getshop")(message.guild.id)
        if(args.length<1){
            return message.channel.sendEm("You didn't provided wallet!")
        }else{
            db.collection("shops").updateOne({guild:message.guild.id},{$set:{wallet:args[0]}})
            message.channel.sendEm(args[0]+" is new wallet for this server!")
        }
    }
};
