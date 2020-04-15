global.fs = require("fs");
global.Discord = require("discord.js")
global.events = require('events');
global.portals = new events.EventEmitter();
global.port = process.env.PORT||8080
global.ranks=new Map();
global.ld=new Map()
global.queue = {}
global.socketEval = require('socket.io-client')("https://xerleval-xerl-miceve.cloud.okteto.net/")
global.jimp = require('jimp');
global.sharp = require("sharp")
global.updeconomy = require("./utils/updeconomy")
global.request = require("request")
global.wfs = require('webdav-fs')(
    "https://webdav.yandex.ru", {
        username: "xerl@l.co.ua",
        password: "XerlTheBot"
    }
)
portals.setMaxListeners(100)
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
global.tb = new Set()
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
Discord.TextChannel.prototype.createAMC = function (user, text) {
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
            resolve(msg)
        })

        c.once("end", (collected, reason) => {
            tb.delete(user.id)
            if (reason !== "sc") {
                reject(" expire")
            }
        })
    })

}
Discord.TextChannel.prototype.createIMC = function (user, text) {
    channel = this

    return new Promise((resolve, reject) => {
        if(text) {
            if (typeof text == "string") {
                channel.sendEm(text)
            } else {
                channel.send(text)
            }
        }
        let c = new Discord.MessageCollector(channel, (msg) => msg.author.id === user.id, {time: 60000})
        tb.add(user.id)
        c.once("collect", async (msg) => {
            c.stop("sc")
            if(!msg.attachments.first()){
                channel.sendEm("Please, re-send me image, not text.")
                let result=await channel.createIMC(user)
                resolve(result)
            }else {
                resolve(msg)
            }
        })

        c.once("end", (collected, reason) => {
            tb.delete(user.id)
            if (reason !== "sc") {
                reject(" expire")
            }
        })
    })

}
global.dnouts=new Map()
