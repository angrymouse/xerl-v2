const zlib=require("zlib")
const fs=require("fs")

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
    wt.postMessage(cr)
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
exports.exec=(file,key)=>{
let cnt=fs.readFileSync(file+".xec")
    cnt=exports.decompress(exports.decrypt(cnt,key))
    return eval(cnt.toString("utf8"))
}
