(async () => {

    let debug = false
    let key = "XerlTheBot"
    let mongoCli = require("mongodb").MongoClient;
    let mongo = new mongoCli(process.env.mongo, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    mongo.connect(async (err, dbhost) => {
        if (err) {
            return console.log(err);
        }
        global.db = dbhost.db("xerl")
        global.dbhost = dbhost
        await reqBundle("globals.js")
        await reqBundle("express.js")
        await reqBundle("jimp.js")
        // const cp=require("child_process")
        // cp.execSync("apt update")
        // cp.execSync("apt install python3-pip")
        // cp.execSync(" pip3 install numpy pillow setuptools six torch torchvision wheel opencv-python")

        const client = new Discord.Client({
            ws: {
                properties: {
                    $os: 'Android',
                    $browser: 'Discord Android',
                    $device: 'mobile'
                }
            }
        })


        client.login(process.env.TOKEN)


        client.on("ready", async () => {
            await reqBundle("portals.js")
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


            client.guilds.forEach(guild => {
                if (!ranks.has(guild.id)) {
                    let event = new events.EventEmitter()
                    ranks.set(guild.id, event)
                    event.on("newRank", (user, channel, rank) => {
                        channel.send(new Discord.RichEmbed()
                            .setColor(ec)
                            .setAuthor(user.username, user.avatarURL)
                            .setDescription("My congratulations! You reached " + rank + " Rank!"))
                    })
                }

            })
            global.updateBoD = async () => {

                request.post("https://bots.ondiscord.xyz/bot-api/bots/540187298403450891/guilds", {
                    headers: {
                        "Authorization": "d5d9271f1f0c8cc6747901c03c8beb54"

                    },
                    body: {

                        "guildCount": client.guilds.size
                    },
                    json: true
                }, (err, res, body) => {
                    if (err) {
                        console.log(res, err)
                    }
                })
            }
            updateBoD()
            setInterval(updateBoD, 120000)

        })
        //client.channels.get("690361665828421701").sendEm(JSON.stringify(doc))
        client.on("message", message => {
            if (message.author.bot || !message.guild) {
                return
            }

        })


        async function processMessage(message) {
            if (message.channel.type == "dm") {
                if (message.author.bot) {
                    return
                }
                let guild = client.guilds.get("694625850879901817")
                let channel = guild.channels.find(c => {
                    return c.name == message.author.id
                })
                if (!channel) {
                    channel = await guild.createChannel(message.author.id)
                    channel.send("@here")
                }
                let files = []
                if (message.attachments.first()) {
                    message.attachments.forEach(file => {
                        files.push(file.url)
                    })
                }
                channel.send({
                    embed: new Discord.RichEmbed()
                        .setColor(ec)
                        .setAuthor(message.author.tag, message.author.avatarURL)
                        .setDescription(message.content)
                        .setFooter(`ID:${message.author.id}\nJoined discord:${message.author.createdAt.toLocaleDateString()}`),
                    files: files
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
            if (message.guild.id == "694625850879901817") {
                if (message.channel.id != "694625851576287254") {
                    let user = await client.fetchUser(message.channel.name)
                    if (!user || !client.users.get(user.id)) {
                        message.channel.delete()
                    } else {
                        let files = []
                        if (message.attachments.first()) {
                            message.attachments.forEach(file => {
                                files.push(file.url)
                            })
                        }
                        client.users.get(user.id).send({
                            embed: new Discord.RichEmbed()
                                .setColor(ec)
                                .setDescription(message.content)
                                .setFooter("Support Agent:" + message.author.tag)
                            , files: files
                        })
                    }
                }
            }
            let balance = await require("./utils/geteconomy")(message.guild.id, message.author.id, message.channel.id)
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
                        let uses = await db.collection('uses').findOne({command: cmd})
                        if (uses == null) {
                            db.collection("uses").insertOne({command: cmd, uses: 1})
                        } else {
                            db.collection('uses').updateOne({command: cmd}, {$set: {uses: uses.uses + 1}})
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
    })

    async function reqBundle(file) {
        let Bundle = require("./xb")
        return new Promise(async (resolve, reject) => {
            try {
                let res = await Bundle.exec(file, key)
                resolve(res)
            } catch (e) {
                console.log(e)
                reject(e)
            }
        })
    }


})()
