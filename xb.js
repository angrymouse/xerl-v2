const zlib=require("zlib")
const fs=require("fs")
exports.cache={

}
exports.optimize=(code)=>{
    code=`const wt=require('worker_threads')
    if(wt.isMainThread){
        throw new Error("Must be child thread")
    }
    (async ()=>{
    return new Promise((resolve, reject) => {
     ${code}
    })
   
    }).then(cr=>{
    wt.postMessage(global)
    }).catch(err=>{
    throw err
    })
    `

}
exports.compress=(code)=>{
    let compressed= zlib.gzipSync(Buffer.from(code))
    return compressed
}
exports.decompress=(code)=>{
    let decompressed= zlib.gunzipSync(Buffer.from(code))
    return decompressed
}
exports.encrypt=(input,key)=>{
    let result=[...input]
    key=Buffer.from(key)
    key=[...key]
    let ki=0
    result.forEach((chunk,ci)=>{
        let preres;
        if(ki%2!=0&&key.length%0==0){
            preres=key.length+chunk+key[ki]
        }else{
            preres=key.length+chunk-key[ki]
        }
        result[ci]=preres
        ki++
        if(ki>=key.length){ki=0}
    })
    return Buffer.from(result)
}
exports.decrypt=(input,key)=>{
    let result=[...input]
    key=Buffer.from(key)
    key=[...key]
    let ki=0
    result.forEach((chunk,ci)=>{
        let preres;
        if(ki%2!=0&&key.length%0==0){
            preres=chunk-key[ki]-key.length
        }else{
            preres=chunk+key[ki]-key.length
        }
        result[ci]=preres
        ki++
        if(ki>=key.length){ki=0}
    })
    return Buffer.from(result)
}
exports.exec=async (file,key)=>{
    const wt=require('worker_threads')
    const os=require("os")
    const path=require("path")
    const fs=require("fs")
    return new Promise((resolve, reject) => {
        let cnt;
        if(!exports.cache[file]){
            cnt=exports.decompress(exports.decrypt(fs.readFileSync(file+".xec"),key))
            exports.cache[file]=cnt
        }else{
            cnt=exports.cache[file]
        }
        try {
            let filename=file
            fs.writeFileSync(path.join(__dirname,filename),cnt)
            resolve(module.require(path.join(__dirname,filename)))

        }catch (e) {
            reject(e)
        }

    })

}
