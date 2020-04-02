module.exports = (args, message) => {
    //global.jimp=require('jimp');
    //console.log(message.attachments.first());
    if (!message.attachments.first()) {
        return message.channel.send(
            new Discord.RichEmbed()
                .setColor("RED")
                .setDescription("Pls, don't break our servers. This command need one attachment (Image to mirror)")
                .setAuthor("Xerl Error Message", client.user.avatarURL)
                .setThumbnail(client.user.avatarURL)
                .addField(
                    "What? What i need use as first attachment to get normal result?",
                    "You need to use image with any resolution"
                )
        )
    }
    jimp.read(message.attachments.first().url).then(image => {
        image.flip(true, false);
        image.getBuffer(jimp.MIME_PNG, (err, ib) => {
            let fid = makeid(10) + ".png";
            fs.writeFile(fid, ib, () => {
                message.channel.send("", {files: [{attachment: fid, name: fid}]}).then(() => {
                    fs.unlinkSync(fid)
                })
            })
        })

    })
};
