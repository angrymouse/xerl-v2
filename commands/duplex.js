module.exports = (args, message) => {
    //global.jimp=require('jimp');
    //console.log(message.attachments.first());
    if (!message.attachments.first()) {
        return message.channel.send(
            new Discord.RichEmbed()
                .setColor("RED")
                .setDescription("Pls, don't break our servers. This command need one attachment (Image to processing)")
                .setAuthor("Xerl Error Message", client.user.avatarURL)
                .setThumbnail(client.user.avatarURL)
                .addField(
                    "What? What i need use as first attachment to get normal result?",
                    "You need to use image with any resolution"
                )
        )
    }
    jimp.read(message.attachments.first().url).then(image => {
        let af = message.attachments.first();
        let ic = image.clone();
        ic.resize(af.width / 2, af.height / 2);
        image.blit(ic, af.width / 2, af.height / 2);
        image.getBuffer(jimp.MIME_PNG, (err, ib) => {
            let fid = makeid(10) + ".png";
            wfs.writeFile(fid, ib, (err, url) => {
                message.channel.send("https://xer.l.co.ua/" + fid)
            })
        })

    })
};
