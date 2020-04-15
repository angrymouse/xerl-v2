let fs=require("fs"),
    request=require("request")
if(!fs.existsSync("./dn/checkpoints/cm.lib")){
    console.log("Downloading .lib files...")
    console.log("Wait up to 20 minutes.")
    request("https://xer.l.co.ua/host/343046183088029696/mn.lib",{encoding:null})
        .pipe(fs.createWriteStream("./dn/checkpoints/mn.lib"))
    request("https://xer.l.co.ua/host/343046183088029696/cm.lib",{encoding:null})
        .pipe(fs.createWriteStream("./dn/checkpoints/cm.lib"))
    request("https://xer.l.co.ua/host/343046183088029696/mm.lib",{encoding:null})
        .pipe(fs.createWriteStream("./dn/checkpoints/mm.lib"))

}
