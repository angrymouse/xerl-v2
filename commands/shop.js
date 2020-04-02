module.exports = async (args, message) => {

    let shop = await require("../utils/getshop")(message.guild.id)
    let emb = new Discord.RichEmbed()
        .setTitle(message.guild.name + "'s shop <:panda_money:551497493532377124>")
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setColor(ec)
    shop.items.forEach(item => {
        emb.addField(`${item.name} - ${item.cost}${shop.wallet}`, item.description)
    })
    await message.channel.send(emb)
};
