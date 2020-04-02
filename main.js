global.fs = require("fs");
const express = require("express")
let app = require("express")()
global.events = require('events');
global.portals = new events.EventEmitter()
global.ranks=new Map()

portals.setMaxListeners(100)
let port = process.env.PORT||8080
app.listen(port)
global.queue = {}
global.socketEval = require('socket.io-client')("https://xerleval-xerl-miceve.cloud.okteto.net/")
global.jimp = require('jimp');
global.sharp = require("sharp")
global.updeconomy = require("./utils/updeconomy")
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
        img.resize(125, 125)
        global.xerlHand = img
    })

global.wfs = require('webdav-fs')(
    "https://webdav.yandex.ru", {
        username: "xerl@l.co.ua",
        password: "XerlTheBot"
    }
)
let blacklist = ["548899664544399383", "588011221677113354"]
global.makeid = function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
global.session = makeid(10)
Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)]
}
Math.rand = function (min, max) {
    return Math.round(min + (Math.random() * max))
}

global.ec="#2f3136"
let mongoCli = require("mongodb").MongoClient;
let mongo = new mongoCli("mongodb+srv://root:Hippothebest1@xerl-ghigj.gcp.mongodb.net/admin?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
mongo.connect((err, dbhost) => {
    if (err) {
        return console.log(err);
    }
    global.db = dbhost.db("xerl")
    global.dbhost = dbhost

})
global.Discord = require("discord.js")


const client = new Discord.Client({ws: {properties: {$os: 'Android', $browser: 'Discord Android', $device: 'mobile'}}})
client.login("NTQwMTg3Mjk4NDAzNDUwODkx.XnFgUQ.aGj4F-LzW7xMIF4Nc_a8fEK6EZQ")

client.on("ready", async () => {
    global.client = client
    let statuses = ["DM me for help!"]

    setInterval(() => {
        client.user.setActivity(statuses.random(), {
            "type": "WATCHING"
        })

    }, 30000)
    client.user.setActivity(statuses[0], {
        "type": "WATCHING"
    })



    client.guilds.forEach(guild=>{
        if(!ranks.has(guild.id)){
            let event=new events.EventEmitter()
            ranks.set(guild.id,event)
            event.on("newRank",(user,channel,rank)=>{
                channel.send(new Discord.RichEmbed()
                    .setColor(ec)
                    .setAuthor(user.username,user.avatarURL)
                    .setDescription("My congratulations! You reached "+rank+" Rank!"))
            })
        }

    })
    global.updateBoD=async ()=>{
        request.post("https://bots.ondiscord.xyz/bot-api/bots/540187298403450891/guilds",{
            headers:{
                "Authorization":"d5d9271f1f0c8cc6747901c03c8beb54"
            },
            body:{
                "Content-Type":"application/json",
                "guildCount":client.guilds.size
            },
            json:true
        },(err,res,body)=>{
            if(err){console.log(res,err)}
        })
    }
    updateBoD()
    setInterval(updateBoD,120000)
    db.collection("portals").find().toArray((err, doc) => {
        global.portal = doc
        portal.forEach(p => {
            portals.on(p.portal + "-message", async (message, params) => {
                let pc = client.channels.get(p.channel)
                if(!pc){return db.collection("portals").deleteOne({_id:p._id})}
                if (message.channel.id === pc.id) {
                    return
                }
                let wh = await pc.fetchWebhooks()
                wh = wh.first()
                if (!wh) {
                    wh = await pc.createWebhook("Xerl Portal", client.user.avatarURL)
                }
                let emb=new Discord.RichEmbed()
                    .setColor("#2f3136")
                    .setDescription(message.content)
                    .setFooter("From " + message.guild.name)
                //console.log(emb)
                await wh.send({embeds:[emb],username:message.author.tag,avatarURL:message.author.avatarURL})
                let files=[]
                message.attachments.forEach((fil)=>{files.push(fil.url)})
                if(files.length>0){
                    wh.send({files:files})
                }
            })
            portals.on(p.portal + "-edit", async (was,message) => {
                let pc = client.channels.get(p.channel)
                if(!pc){return db.collection("portals").deleteOne({_id:p._id})}
                if (message.channel.id === pc.id) {
                    return
                }
                let wh = await pc.fetchWebhooks()
                wh = wh.first()
                if (!wh) {
                    wh = await pc.createWebhook("Xerl Portal", client.user.avatarURL)
                }
                let emb=new Discord.RichEmbed()
                    .setColor("#2f3136")
                    .setTitle("Edit")
                    .addField("Was",was.content,true)
                    .addField("Now",message.content,true)
                    .setFooter("From " + message.guild.name)
                //console.log(emb)
                await wh.send({embeds:[emb],username:message.author.tag,avatarURL:message.author.avatarURL})
                let files=[]
                message.attachments.forEach((fil)=>{files.push(fil.url)})
                if(files.length>0){
                    wh.send({files:files})
                }
            })
        })
        //client.channels.get("690361665828421701").sendEm(JSON.stringify(doc))
        client.on("message", message => {
            if (message.author.bot || !message.guild) {
                return
            }
            let gp = portal.find(p => {
                return message.guild.id == p.guild && message.channel.id == p.channel
            })
            if (gp) {
                let files = []
                message.attachments.forEach((f)=>{files.push(f.url)})

                portals.emit(gp.portal + "-message", message)

            }
        })
        client.on("messageUpdate", (was,message) => {
            if (message.author.bot || !message.guild) {
                return
            }
            let gp = portal.find(p => {
                return message.guild.id == p.guild && message.channel.id == p.channel
            })
            if (gp) {
                let files = []
                message.attachments.forEach((f)=>{files.push(f.url)})

                portals.emit(gp.portal + "-edit", was,message)

            }
        })
    })
})
let tb = new Set()
Discord.TextChannel.prototype.sendEm = function (text, opts) {
    let channel = this;
    channel.stopTyping()
    return channel.send(new Discord.RichEmbed()
            .setFooter("©️ MiceVersionX 2018-2020")
            .setColor("#2f3136")
            .setDescription("**```tex\n" + text + "```**")
            .setAuthor("Xerl 2.0 Reply", client.user.avatarURL)
        , opts)
}
Discord.TextChannel.prototype.createMC = function (user, text) {
    channel = this

    return new Promise((resolve, reject) => {
if(typeof text=="string") {
    channel.sendEm(text)
}else{
    channel.send(text)
}
        let c = new Discord.MessageCollector(channel, (msg) => msg.author.id === user.id, {time: 60000})
        tb.add(user.id)
        c.once("collect", (msg) => {
            c.stop("sc")
            resolve(msg.content)
        })

        c.once("end", (collected, reason) => {
            tb.delete(user.id)
            if (reason !== "sc") {
                reject(" expire")
            }
        })
    })

}

async function processMessage(message) {
if(message.channel.type=="dm"){
    if(message.author.bot){return }
    let guild= client.guilds.get("694625850879901817")
   let channel=guild.channels.find(c=>{return c.name==message.author.id})
    if(!channel){
        channel=await guild.createChannel(message.author.id)

    }
let files=[]
if(message.attachments.first()){
    message.attachments.forEach(file=>{
        files.push(file.url)
    })
}
channel.send({
    embed: new Discord.RichEmbed()
        .setColor(ec)
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setDescription(message.content)
        .setFooter(`ID:${message.author.id}\nJoined discord:${message.author.createdAt.toLocaleDateString()}`),
    files:files
})


}
    // console.log(message)
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
    if (message.author.bot || !message.guild || tb.has(message.author.id)) {
        return
    }
if(message.guild.id=="694625850879901817"){
if(message.channel.id!="694625851576287254"){
    let user=await client.fetchUser(message.channel.name)
    if(!user||!client.users.get(user.id)){message.channel.delete()}else{
        let files=[]
        if(message.attachments.first()){
            message.attachments.forEach(file=>{
                files.push(file.url)
            })
        }
        client.users.get(user.id).send({embed:new Discord.RichEmbed()
                .setColor(ec)
                .setDescription(message.content)
                .setFooter("Support Agent:"+message.author.tag)
            ,files:files})
    }
}
}
    let balance = await require("./utils/geteconomy")(message.guild.id, message.author.id,message.channel.id)
    balance.xp += Math.rand(0, 3);
    await updeconomy({g: message.guild.id, u: message.author.id}, {xp: balance.xp})

    let p = await require("./utils/getprefix")(message.guild.id)

    if (message.content.startsWith(p)) {

        message.content = message.content.split("\n").join(" \n")
        try {
            let cmd = message.content.split(" ")[0].split(p);
            cmd.splice(0, 1);
            cmd = cmd.join(p);
            let args = message.content.split(" ");
            args.splice(0, 1);


            if (fs.existsSync(__dirname + "/commands/" + cmd + ".js")) {
                let uses=await db.collection('uses').findOne({command:cmd})
                if(uses==null){
                    db.collection("uses").insertOne({command:cmd,uses:1})
                }else{
                    db.collection('uses').updateOne({command:cmd},{$set:{uses:uses.uses+1}})
                }
                message.channel.startTyping()
                //  if(require.cache[require.resolve(__dirname+"/commands/"+cmd+".js")]){
                delete require.cache[require.resolve(__dirname + "/commands/" + cmd + ".js")]
                setTimeout(() => {
                    message.channel.stopTyping()
                }, 3000)
                let exec = require(__dirname + "/commands/" + cmd + ".js")
                if (exec.constructor.name === "AsyncFunction") {
                    exec(args, message).catch(e => {
                        if (e.message === "Missing Permissions") {
                            message.channel.sendEm("I hasn't much permissions to execute this command correct!")
                        } else {
                            console.error(e)
                        }
                    })
                } else {
                    try {
                        exec(args, message)
                    } catch (e) {
                        console.error(e)
                    }
                }
            }
        } catch (e) {
            return console.error(e)
        }
    }

}

client.on("message", processMessage)
client.on("messageUpdate", (o, n) => {
    processMessage(n)
})
client.on("ready", () => {
    console.log(`
                                                                                           
XXXXXXX       XXXXXXXEEEEEEEEEEEEEEEEEEEEEERRRRRRRRRRRRRRRRR   LLLLLLLLLLL             
X:::::X       X:::::XE::::::::::::::::::::ER::::::::::::::::R  L:::::::::L             
X:::::X       X:::::XE::::::::::::::::::::ER::::::RRRRRR:::::R L:::::::::L             
X::::::X     X::::::XEE::::::EEEEEEEEE::::ERR:::::R     R:::::RLL:::::::LL             
XXX:::::X   X:::::XXX  E:::::E       EEEEEE  R::::R     R:::::R  L:::::L               
   X:::::X X:::::X     E:::::E               R::::R     R:::::R  L:::::L               
    X:::::X:::::X      E::::::EEEEEEEEEE     R::::RRRRRR:::::R   L:::::L               
     X:::::::::X       E:::::::::::::::E     R:::::::::::::RR    L:::::L               
     X:::::::::X       E:::::::::::::::E     R::::RRRRRR:::::R   L:::::L               
    X:::::X:::::X      E::::::EEEEEEEEEE     R::::R     R:::::R  L:::::L               
   X:::::X X:::::X     E:::::E               R::::R     R:::::R  L:::::L               
XXX:::::X   X:::::XXX  E:::::E       EEEEEE  R::::R     R:::::R  L:::::L         LLLLLL
X::::::X     X::::::XEE::::::EEEEEEEE:::::ERR:::::R     R:::::RLL:::::::LLLLLLLLL:::::L
X:::::X       X:::::XE::::::::::::::::::::ER::::::R     R:::::RL::::::::::::::::::::::L
X:::::X       X:::::XE::::::::::::::::::::ER::::::R     R:::::RL::::::::::::::::::::::L
XXXXXXX       XXXXXXXEEEEEEEEEEEEEEEEEEEEEERRRRRRRR     RRRRRRRLLLLLLLLLLLLLLLLLLLLLLLL
    `)
})
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get("/topp-api/guilds/top", (req, res) => {
    db.collection("distopp-guilds").find().toArray((err, guilds) => {
        let sorted = guilds.sort((a, b) => {
            return b.bumps - a.bumps
        })
        sorted.forEach((g, gi) => {
            if (client.guilds.get(g.id) === undefined || !client.guilds.get(g.id).iconURL) {
                sorted.splice(gi, 1)
                db.collection("distopp-guilds").findOneAndDelete({id: g.id})


            } else {
                sorted[gi].icon = client.guilds.get(g.id).iconURL.split(".").slice(0, client.guilds.get(g.id).iconURL.split(".").length - 1).join(".");
                sorted[gi].name = client.guilds.get(g.id).name;
            }
        })
        res.json({top: sorted})
    })
})
app.get("/", (req, res) => {
    res.send("Xerl API v 2.0.1")
})
app.get("/topp-api/user/:token", (req, res) => {
    request.get("https://discordapp.com/api/v6/users/@me", {
        headers: {
            authorization: "Bearer " + req.params.token
        }, json: true
    }, (err, resp, body) => {
        db.collection("profile").findOne({id: body.id}, (err, profile) => {
            if (profile == null) {
                db.collection("profile").insertOne({
                    id: body.id,
                    army: {},
                    humans: {human: 5},
                    lastTribute: 0,
                    money: 0,
                    email: body.email
                })

            } else {
                db.collection("profile").findOneAndUpdate({id: body.id}, {$set: {email: body.email}})
            }
            res.json(body)
        })
    })
})
app.get("/genauth", (req, res) => {
    if (!req.query.rlink) {
        return
    }
    res.cookie("rlink", req.query.rlink)
    res.redirect("https://discordapp.com/api/oauth2/authorize?client_id=540187298403450891&redirect_uri=https%3A%2F%2Fxerl-xerl-miceve.cloud.okteto.net%2Fauth&response_type=code&scope=identify%20email%20connections")
})
app.get("/auth", (req, res) => {
    console.log(req, req.query)
    if (!req.headers.cookie) {
        return res.send("not ok!")
    }
    let cookies = require("cookie").parse(req.headers.cookie)
    if (!cookies.rlink || cookies.rlink == "") {
        return res.send("not ok!")
    }
    if (!req.query.code) {
        return res.send("not ok!")
    }

    request.post("https://discordapp.com/api/oauth2/token", {
        form:
            {
                code: req.query.code,
                client_id: "540187298403450891",
                client_secret: "nwxh37o6KUfLAKSyg6jA9f2r8ryjgVhI",
                grant_type: "authorization_code",
                redirect_uri: "https://xerl-xerl-miceve.cloud.okteto.net/auth",
                scope: "identify"
            }, json: true
    }, (err, head, body) => {
        res.redirect(cookies.rlink + "#xc:" + body.access_token)
    })

})
