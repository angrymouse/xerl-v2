module.exports = (args, message) => {
    let commands = fs.readdirSync("./commands/");
    commands.forEach((command, commandIndex) => {
        commands[commandIndex] = commands[commandIndex].split(".")[0]
    });
    message.channel.send(
        new Discord.RichEmbed()
            .setColor("RANDOM")
            .setAuthor("Xerl Commands", [message.author.avatarURL, client.user.avatarURL].random())
            .setTitle("Xerl have " + commands.length + " commands")
            .setDescription(commands.join("\n"))
            .addField("How to use this commands!1!?/", "You can get info about any command from list by typing ``-help {command}``\nAlso, if you have a question, you can join our support guild: https://discord.gg/dFd7vxG")
    )
};
