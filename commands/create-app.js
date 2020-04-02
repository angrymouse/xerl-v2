module.exports = (args, message) => {
    if (!args[1]) {
        return message.channel.send(
            new Discord.RichEmbed()
                .setColor("RED")
                .setDescription("Pls, don't break our servers. This command need two arguments (app name and app code)")
                .setAuthor("Xerl Error Message", client.user.avatarURL)
                .setThumbnail(client.user.avatarURL)
                .addField(
                    "What? What i need use as two first arguments to get normal result?",
                    "You need to use name of application as first argument, and it's code as other arguments"
                )
        )
    }

    let code = Array.from(args);
    code.splice(0, 1);
    code = code.join(" ");
    wfs.stat("/apps/" + args[0] + ".app", (e, d) => {
        if (d) {
            message.channel.send(new Discord.RichEmbed().setColor("RED")
                .setDescription("Xerl Application creation failed: ``App with this name alredy exists!``\nUse ``edit-app`` to edit applications."))
        } else {
            wfs.writeFile("/apps/" + args[0] + ".owner", message.author.id, () => {
            });
            wfs.writeFile("/apps/" + args[0] + ".app", code, () => {
                message.channel.send(new Discord.RichEmbed().setColor("BLUE")
                    .setDescription("Xerl Application created successfully!\nRaw: https://xer.l.co.ua/apps/" + args[0] + ".app"))
            })
        }
    })

};
