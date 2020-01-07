module.exports=(args,message)=>{
  message.channel.send(
    new Discord.RichEmbed()
    .setColor("BLUE")
    .setAuthor("Xerl Apps Rules")
    .setDescription(`1. Prohibited content that may pose a threat to the psyche of the person who runs this application (pornography, child pornography, images with bloodied bodies or parts of bodies)

2. Prohibited links to Darknet.

3. Prohibited coup d'etat.`)
    .setFooter("Violation of these rules will lead to removal of the application from our servers.")
  )
}
