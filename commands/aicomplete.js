module.exports = async (args, message) => {
    let type=2
    if (args.length < 1) {
        return message.channel.sendEm("Please, provide text to complete.")
    } else {
        if(message.guild.region=="russia"){type=1}
    message.channel.sendEm(await require("../utils/complete-ai")(args.join(" "),type))
    }

}
