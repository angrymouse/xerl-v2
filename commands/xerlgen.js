module.exports = (args, message) => {
    //global.jimp=require('jimp');
    //console.log(message.attachments.first());
    if (!message.attachments.first() && !message.mentions.members.first()) {
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
    let url;
    if (!message.attachments.first()) {

        url = message.mentions.members.first().user.avatarURL
    } else {
        url = message.attachments.first().url
    }

    function xerlify(image, x, y, rad) {
        image.resize(512, 512);
        image.crop(y, x, 100, 200);
        image.rotate(rad);
        return image
    }

    function eye(image, x, y) {
        image.resize(512, 512);
        image.crop(x, y, 50, 75);
        image.rotate(90);
        return image
    }

    jimp.read(url).then(image => {
        new jimp(512, 512, 0x0, (err, canvas) => {
            canvas.blit(xerlify(image.clone(), 100, 100, -45), 0, 0);
            canvas.blit(xerlify(image.clone(), 200, 100, 45), 70, 0);
            canvas.blit(xerlify(image.clone(), 300, 100, 90), 40, 90);
            canvas.blit(eye(image.clone(), 420, 300), 60, 40);
            canvas.blit(eye(image.clone(), 420, 400), 140, 40);
            canvas.crop(0, 0, 300, 240);
            canvas.blit(xerlHand, 0, 100);
            canvas.getBuffer(jimp.MIME_PNG, (err, ib) => {
                let fid = makeid(10) + ".png";
                fs.writeFile(fid, ib, () => {
                    message.channel.send("", {
                        files: [{
                            attachment: fid,
                            name: fid
                        }]
                    }).then(() => {
                        fs.unlinkSync(fid)
                    })
                })
            })
        })


    })
};
