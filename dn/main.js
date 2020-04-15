const sharp=require("sharp"),
    wt=require("worker_threads"),
    cp=require("child_process"),
    fs=require("fs")
    os=require("os"),
    path=require("path"),
    makeid = length => {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}
module.exports=async (buf)=>{
    return new Promise(async (resolve, reject) => {
        let il=path.join(os.tmpdir(),makeid(20)+".png")
        let io=path.join(os.tmpdir(),makeid(20)+".png")
        sharp(buf)
            .resize(512,512)
            .toBuffer().then((bufx)=>{
                fs.writeFileSync(il,bufx)
            let dnw=new wt.Worker(__dirname+"/worker.js",{workerData:{il:il,io:io}})
            dnw.on("exit",(code)=>{
                if(code==0){
                    resolve(fs.readFileSync(io))
                }else{
                    reject(dnw.stderr)
                }
            })
        })

    })

}
