module.exports=async (guild)=>{
    return new Promise((resolve,reject)=>{
        db.collection("prefixes").findOne({guild: guild}, (err, doc) => {
            if(err){reject(err)}
            if (doc == null) {
                db.collection("prefixes").insertOne({guild: guild, prefix: "$"})
                resolve("$")
            } else {
                resolve(doc.prefix)
            }
        })
    })
}
