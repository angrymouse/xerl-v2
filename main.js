global.fs = require("fs");
let app=require("express")()
let port=process.env.PORT||3000
app.listen(port)
app.get("/",(req,res)=>{res.send("Xerl is V"+require('./package.json').version)})
global.socketEval = require('socket.io-client')("http://185.246.67.139:5555/")
global.jimp = require('jimp');
global.request = require("request")
jimp.read("https://xer.l.co.ua/host/343046183088029696/QkPUlP0pP0JD1JT9KT9CQ9adEPQh7EnYi6El6kp6kJlJepKepCfpSXqSnqQn6Ul6kp6kJlJepKepCfpSXqSnqQn6Ul60n4If8ynh.png")
  .then(gayFlag => {
    global.gayFlag = gayFlag
  })
  jimp.read("https://xer.l.co.ua/host/343046183088029696/KAFNIK-3-x-5-FT-90-150cm-60-90cm-Communism-Flag-Marx-Engels-Lenin-Stalin-CCCP.png")
  .then(communism => {
      global.communismFlag = communism
    })
    jimp.read("https://xer.l.co.ua/host/343046183088029696/unknown.png")
    .then(img => {
      img.resize(125,125)
        global.xerlHand = img
      })

      global.wfs = require('webdav-fs')(
        "https://webdav.yandex.ru", {
    username: "xerl@l.co.ua",
    password: "XerlTheBot"
  }
)
global.makeid = function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)]
}
Math.rand = function(min, max) {
  return Math.round(min + (Math.random() * max))
}
let p = "-"
global.db = require("./db")("fnADgaOiUMACAPqjgS5DSgFbDdKBdKOkejDVorCv")
global.Discord = require("discord.js")

global.client = new Discord.Client()
client.login("NTQwMTg3Mjk4NDAzNDUwODkx.XSlyVQ.YLPvjfq8P6QOXNQ1rukp40UDPDY")
client.on("ready", () => {
  let statuses = ["-help", "My prefix is -", "Users", "Youtube", "in the future"]

  setInterval(() => {
    client.user.setActivity(statuses.random(), {
      "type": "WATCHING"
    })

  }, 30000)
  client.user.setActivity(statuses[0], {
    "type": "WATCHING"
  })

})
function processMessage(message) {
if(message.author.bot||!message.guild){return}
    if (message.content.startsWith(p)) {
      message.content = message.content.split("\n").join(" \n")
      try {
        let cmd = message.content.split(" ")[0].split(p);
        cmd.splice(0, 1);
        cmd = cmd.join(p);
        let args = message.content.split(" ");
        args.splice(0, 1);
        if (fs.existsSync(__dirname + "/commands/" + cmd + ".js")) {
          if(Math.rand(0,10)==10){
            message.channel.send("Please, join our discord guild: https://discord.gg/S3kxatV")
          }
          message.channel.sendEm=(text,opts)=>{
            message.channel.stopTyping()
            return message.channel.send(new Discord.RichEmbed()
            .setFooter("©️ MiceVersionX 2018-2020")
            .setColor("RANDOM")
            .setDescription(text)
            .setAuthor("Reply to "+message.author.tag+"'s command",message.author.avatarURL)
            ,opts)
          }
          message.channel.startTyping()
          //  if(require.cache[require.resolve(__dirname+"/commands/"+cmd+".js")]){
          delete require.cache[require.resolve(__dirname + "/commands/" + cmd + ".js")]
          setTimeout(()=>{message.channel.stopTyping()},3000)
          require(__dirname + "/commands/" + cmd + ".js")(args, message)

        }
      } catch (e) {
        return console.error(e)
      }
    }
}
client.on("message",processMessage)
client.on("messageUpdate",(o,n)=>{processMessage(n)})
client.on("ready",()=>{console.log("ready")})
