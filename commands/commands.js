module.exports = (args, message) => {
    let commands = fs.readdirSync("./commands/");
    commands.forEach((command, commandIndex) => {


        if(command.endsWith(".xec")) {
            commands.splice(commandIndex,1)
        }


    });
    commands.forEach((command,commandIndex)=>{
        commands[commandIndex] = commands[commandIndex].split(".")[0]
    })
    message.channel.send(
        new Discord.RichEmbed()
            .setColor("RANDOM")
            .setAuthor("Xerl Commands", [message.author.avatarURL, client.user.avatarURL].random())
            .setTitle("Xerl have " + commands.length + " commands")
            .setDescription(commands.join("\n"))
            .addField("How to use this commands!1!?/", "You can [visit our site](https://xerl.co.ua/commands) or just DM to me, support agents will help you!")
    )
};
