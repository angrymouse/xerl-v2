module.exports = async (args, message) => {
    let img = await message.channel.createIMC(message.author, "Okay, send me meme image")
    let image = img.attachments.first()
    let topText = await message.channel.createMC(message.author, "Send me top text (or none if have no one)")
    let bottomText = await message.channel.createMC(message.author, "Send me bottom text (or none if have no one)")
    let topSVG;
    let bottomSVG;
    if (topText != "none") {
        let x = Math.round(image.width / 2) - (Math.round(image.width / 15) * topText.length) / 4
        topSVG = Buffer.from(`

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${image.width} ${image.height}">
<style>
.text{
transform: translate(-50%,0);
}
</style>
    <text class="text" y="50" x="${x}" font-size="${Math.round(image.width / 15)}" font-weight="bold" 
    font-family="Avenir, Helvetica, sans-serif" fill="#fff">
        ${topText}
    </text>
</svg>
`)

    } else {
        topSVG = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg">
</svg>
`)
    }
    if (bottomText != "none") {
        let x = Math.round(image.width / 2) - (Math.round(image.width / 15) * topText.length) / 4
        bottomSVG = Buffer.from(`

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${image.width} ${image.height}">
<style>
.text{
transform: translate(-50%,0);
}
</style>
    <text class="text" y="${image.height-50}" x="${x}" font-size="${Math.round(image.width / 15)}" font-weight="bold" 
    font-family="Avenir, Helvetica, sans-serif" fill="#fff">
        ${bottomText}
    </text>
</svg>
`)

    } else {
        bottomSVG = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg">
</svg>
`)
    }
    request.get(img.attachments.first().url, {encoding: null}, async (err, res, body) => {
        topSVG = await sharp(topSVG)
            .toBuffer()
        bottomSVG = await sharp(bottomSVG)
            .toBuffer()
            //.resize(Math.round(image.width/5),Math.round(image.height/10))

        sharp(body)
            .composite([{input: topSVG, left: Math.round(image.width / 2), top: 10}, {
                input: bottomSVG,
                left: Math.round(image.width / 2),
                top:10
            }])
            .toBuffer((err, image) => {
                message.channel.send(new Discord.Attachment(image, "image.png"))
            })
    })
};
