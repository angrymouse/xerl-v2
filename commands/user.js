module.exports = (args, message) => {
    if (typeof message.mentions.users.first() != "undefined") {
        let target = message.mentions.users.first();
        message.channel.send(
            new Discord.RichEmbed()
                .setColor("RANDOM")
                .addField("Username", target.username)
                .addField("Discriminator", target.discriminator)
                .addField("Tag", target.tag)
                .addField("Bot", target.bot ? "Yes" : "No")
                .addField("Avatar URL", target.avatarURL)
                .addField("ID", target.id)
                .setThumbnail(target.avatarURL)
        )
    } else {
        if (!args[0]) {
            return message.channel.send(
                new Discord.RichEmbed()
                    .setColor("RED")
                    .setDescription("Pls, don't break our servers. This command need one argument (Mention of user or his tag)")
                    .setAuthor("Xerl Error Message", client.user.avatarURL)
                    .setThumbnail(client.user.avatarURL)
                    .addField(
                        "What? What i need use as first argument to get normal result?",
                        "You need to use mention of user or his tag"
                    )
            )
        } else {
            client.guilds.forEach(server => {
                server.fetchMembers()
            });
            let target = client.users.find(u => u.tag == args.join(" "));
            if (target == null) {
                return message.channel.send(new Discord.RichEmbed()
                    .setColor("RED")
                    .setDescription("Pls, don't break our servers. This user isn't exists in discord.")
                    .setAuthor("Xerl Error Message", client.user.avatarURL)
                    .setThumbnail(client.user.avatarURL)
                )
            } else {
                message.channel.send(
                    new Discord.RichEmbed()
                        .setColor("RANDOM")
                        .addField("Username", target.username)
                        .addField("Discriminator", target.discriminator)
                        .addField("Tag", target.tag)
                        .addField("Bot", target.bot ? "Yes" : "No")
                        .addField("Avatar URL", target.avatarURL)
                        .addField("ID", target.id)
                        .setThumbnail(target.avatarURL)
                )
            }
        }
    }
};
