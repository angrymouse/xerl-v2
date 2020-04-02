module.exports = async (args, message) => {
    if (!message.member.hasPermission("ADMINISTRATOR") && message.author.id != "343046183088029696") {
        message.channel.sendEm("You must be ``GUILD ADMINISTRATOR`` to use this command.")
    } else {
        let shop = await require("../utils/getshop")(message.guild.id)

        let data = {}
        try {
            data.name = await message.channel.createMC(message.author, "Okay! Provide name for new item:")
            data.description = await message.channel.createMC(message.author, "Okay! Provide it's description:")
            data.cost = await message.channel.createMC(message.author, "Okay! Provide it's cost (number):")
        }catch (e) {
            message.channel.sendEm("Time is out! Aborted!")
        }
        if (isNaN(data.cost)) {
            return message.channel.sendEm("Cost must be a number 😡! Aborted!")
        } else {
        data.cost=Number(data.cost)
        }
        data.events= {
            "buy": [],
                "expire": [],
                "sell": []
        }
        data.id=makeid(40)
        data.neededRole=null
        shop.items.push(data)
        await db.collection("shops").findOneAndUpdate({_id:shop._id},{$set:{items:shop.items}})
        message.channel.send("Item ``"+data.name+"`` added to shop!")
    }
};
