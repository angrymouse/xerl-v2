global.fs = require("fs");
let app=require("express")()
let port=process.env.PORT||3000
app.listen(port)
app.get("/",(req,res)=>{res.send("Xerl is okay")})
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
client.login("NjU5MTI2MjA2NDIzMTA1NTY2.XgJxuQ._eqxrnZA2olp6pJT8OTxDOXBT-A")
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

client.on("message", (message) => {
  if (message.content.startsWith(p)) {
    message.content = message.content.split("\n").join(" \n")
    try {
      let cmd = message.content.split(" ")[0].split(p);
      cmd.splice(0, 1);
      cmd = cmd.join(p);
      let args = message.content.split(" ");
      args.splice(0, 1);
      if (fs.existsSync(__dirname + "/commands/" + cmd + ".js")) {
        message.channel.startTyping()
        //  if(require.cache[require.resolve(__dirname+"/commands/"+cmd+".js")]){
        delete require.cache[require.resolve(__dirname + "/commands/" + cmd + ".js")]

        require(__dirname + "/commands/" + cmd + ".js")(args, message)
        message.channel.stopTyping()
      }
    } catch (e) {
      return console.error(e)
    }
  }
})
