module.exports=(args,message)=>{

    if(message.author.id!="343046183088029696"){
        return message.channel.sendEm("Patching xerl is too wrong, so only developers can do it.")
    }else{

        const unzipper = require('unzipper');
        if(!message.attachments.first()){
            message.channel.sendEm("Patchfile required!")
        }else{
            console.log(1)
            request.get(message.attachments.first().url,{encoding:null},(err,data)=>{

                fs.writeFileSync("./patch.zip",decrypt(data.toString("binary")))
                extract(process.cwd()+"/patch.zip",{dir: process.cwd()},(err)=>{console.error(err)})
                message.channel.sendEm("ok")
            })
        }
    }
}