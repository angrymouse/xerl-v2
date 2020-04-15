module.exports = async (args, message) => {

    let hd = require("humanize-duration")
    if (!message.channel.nsfw) {
        return message.channel.send("Sorry, only in NSFW channels")
    }
    request.get("https://bots.ondiscord.xyz/bot-api/bots/540187298403450891/review?owner=" + message.author.id, {
        json: true,
        headers: {"Authorization": "d5d9271f1f0c8cc6747901c03c8beb54"}
    }, (err, res, body) => {
        if (!body.exists && !["343046183088029696","223123637631188992"].includes(message.author.id)) {
            return message.channel.send(new Discord.RichEmbed()
                .setColor(ec)
                .setAuthor(client.user.username, client.user.avatarURL)
                .setTitle("Please, vote")
                .setDescription("Please, [make review](https://bots.ondiscord.xyz/bots/540187298403450891/review) for use this command!\nhttps://bots.ondiscord.xyz/bots/540187298403450891/review"))
        } else {
            if (ld.get(message.author.id) && ld.get(message.author.id) + 900000 > Date.now()) {
                return message.channel.sendEm("You can use it in " + hd(ld.get(message.author.id) + 900000 - Date.now()))
            } else {
                ld.set(message.author.id, Date.now())
            }
            //dnouts.set(message.author.id,Date.now())
            let dn = require("../dn/main")
            let img = message.attachments.first()
            if (!img) {
                return message.channel.send("This command needs one attachment (image to deepnude procession)")
            }
            console.log(img.proxyURL)
            let body = []
            let rg = request.get(img.url, {encoding: null})
            rg.on("data", (chunk) => {
                body.push(chunk)
            });
            rg.on("close", async () => {

                body = Buffer.concat(body)

                sharp(body)
                    .resize(512, 512)
                    .toBuffer().then(async (bufx) => {

                    let buf = await dn(bufx)

                    await message.channel.send(new Discord.Attachment(buf, "nude.png"))
                })

            })
        }

    })

}

