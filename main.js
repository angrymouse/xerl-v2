global.fs = require("fs");
const express=require("express")
let app=require("express")()
let port=8080
app.listen(port)
global.queue={}
global.socketEval = require('socket.io-client')("https://xerleval-xerl-miceve.cloud.okteto.net/")
global.jimp = require('jimp');
global.sharp=require("sharp")
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
let blacklist=["548899664544399383","588011221677113354"]
global.makeid = function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
global.session=makeid(10)
Array.prototype.random = function() {
  return this[Math.floor(Math.random() * this.length)]
}
Math.rand = function(min, max) {
  return Math.round(min + (Math.random() * max))
}
let p = "-"

let mongoCli = require("mongodb").MongoClient;
let mongo = new mongoCli("mongodb://root:xerl@mongodb.xerl-miceve.svc.cluster.local:27017/", { useUnifiedTopology: true,useNewUrlParser: true });
mongo.connect((err,dbhost)=>{
  if(err){
    return console.log(err);
  }
  global.db=dbhost.db("xerl")
  global.dbhost=dbhost
})
global.Discord = require("discord.js")
const ytdl = require('ytdl-core');

const client = new Discord.Client({ ws: { properties: { $os: 'android', $browser: 'mobile', $device: 'mobile' } } })
if(process.env.DEBUG){
  client.login("NTQwMTg3Mjk4NDAzNDUwODkx.XlKbKw.UsAg1pqtP8XPqr8ePCmIi0U2jAg")
}else{
  client.login("NTQwMTg3Mjk4NDAzNDUwODkx.XlKbKw.UsAg1pqtP8XPqr8ePCmIi0U2jAg")
}
client.on("ready", () => {
  global.client=client
  let statuses = ["$commands", "My prefix is $", "Users", "Youtube", "in the future"]

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
  // if(message.attachments.first()){
  //   if(message.author.id==client.user.id){return}
  //   //console.log(message.attachments)
  //   let attachments=[]
  //   message.attachments.array().forEach(attachment=>{
  //     if(attachment.width){ attachments.push(attachment.url)}
  //
  //   })
  //   if(attachments.length<1){return}
  //   client.channels.get("678308084661092365").send({files:attachments})
  // }
if(message.author.bot||!message.guild){return}
db.collection("prefixes").findOne({guild:message.guild.id},(err,doc)=>{
  if(doc==null){
    db.collection("prefixes").insertOne({guild:message.guild.id,prefix:"$"})
  }else{
    let p=doc.prefix
    if (message.content.startsWith(p)) {
      message.content = message.content.split("\n").join(" \n")
      try {
        let cmd = message.content.split(" ")[0].split(p);
        cmd.splice(0, 1);
        cmd = cmd.join(p);
        let args = message.content.split(" ");
        args.splice(0, 1);
        if (fs.existsSync(__dirname + "/commands/" + cmd + ".js")) {
          message.channel.sendEm=(text,opts)=>{
            message.channel.stopTyping()
            return message.channel.send(new Discord.RichEmbed()
                    .setFooter("©️ MiceVersionX 2018-2020")
                    .setColor("RANDOM")
                    .setDescription(text)
                    .setAuthor("Reply to "+message.author.tag+"'s command",message.author.avatarURL)
                ,opts)
          }
          db.collection("profile").findOne({id:message.author.id},(err,profile)=>{
            if(profile==null){
              db.collection("profile").insertOne({id:message.author.id,army:{},humans:{human:5},lastTribute:0,money:0})
              profile={id:message.author.id,army:{},humans:{human:5},lastTribute:0,money:0}
            }

            message.channel.startTyping()
            //  if(require.cache[require.resolve(__dirname+"/commands/"+cmd+".js")]){
            delete require.cache[require.resolve(__dirname + "/commands/" + cmd + ".js")]
            setTimeout(()=>{message.channel.stopTyping()},3000)
            require(__dirname + "/commands/" + cmd + ".js")(args, message,profile)

          })

        }
      } catch (e) {
        return console.error(e)
      }
    }
  }
})

}
client.on("message",processMessage)
client.on("messageUpdate",(o,n)=>{processMessage(n)})
client.on("ready",()=>{console.log("ready")})
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get("/topp-api/guilds/top",(req,res)=>{
  db.collection("distopp-guilds").find().toArray((err,guilds)=>{
    let sorted=guilds.sort((a,b)=>{return b.bumps-a.bumps})
    sorted.forEach((g,gi)=>{
      if(client.guilds.get(g.id)===undefined||!client.guilds.get(g.id).iconURL){
        sorted.splice(gi,1)
        db.collection("distopp-guilds").findOneAndDelete({id:g.id})


      }else{
        sorted[gi].icon=client.guilds.get(g.id).iconURL.split(".").slice(0,client.guilds.get(g.id).iconURL.split(".").length-1).join(".");
        sorted[gi].name=client.guilds.get(g.id).name;
      }
    })
    res.json({top:sorted})
  })
})
app.get("/topp-api/user/:token",(req,res)=>{
  request.get("https://discordapp.com/api/v6/users/@me",{headers:{
    authorization:"Bearer "+req.params.token
    },json:true},(err,resp,body)=>{
    db.collection("profile").findOne({id:body.id},(err,profile)=>{
      if(profile==null){
        db.collection("profile").insertOne({id:body.id,army:{},humans:{human:5},lastTribute:0,money:0,email:body.email})

      }else{
        db.collection("profile").findOneAndUpdate({id:body.id},{$set:{email:body.email}})
      }
      res.json(body)
    })
  })
})
app.get("/genauth",(req,res)=>{
  if(!req.query.rlink){return}
  res.cookie("rlink",req.query.rlink)
   res.redirect("https://discordapp.com/api/oauth2/authorize?client_id=540187298403450891&redirect_uri=https%3A%2F%2Fxerl-xerl-miceve.cloud.okteto.net%2Fauth&response_type=code&scope=identify%20email%20connections")
})
app.get("/auth",(req,res)=>{
  console.log(req,req.query)
  if(!req.headers.cookie){return res.send("not ok!")}
  let cookies=require("cookie").parse(req.headers.cookie)
  if(!cookies.rlink||cookies.rlink==""){return res.send("not ok!")}
  if(!req.query.code){return res.send("not ok!")}

  request.post("https://discordapp.com/api/oauth2/token",{form:
        {code:req.query.code,
          client_id:"540187298403450891",
          client_secret:"nwxh37o6KUfLAKSyg6jA9f2r8ryjgVhI",
          grant_type:"authorization_code",
          redirect_uri:"https://xerl-xerl-miceve.cloud.okteto.net/auth",
          scope:"identify"},json:true},(err,head,body)=>{
  res.redirect(cookies.rlink+"#xc:"+body.access_token)
  })

})