#!/usr/bin/node
const fs=require("fs"),
    Bundle=require("./xb"),
    path = require("path")

const getAllFiles = function(dirPath, arrayOfFiles) {
    files = fs.readdirSync(dirPath)

    arrayOfFiles = arrayOfFiles || []

    files.forEach(function(file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            if(!["node_modules",".git","dn"].includes(file)) {
                arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
            }
        } else {
            if(!file.endsWith(".xec")) {
                arrayOfFiles.push(path.join(process.cwd(), dirPath, "/", file))
            }
        }
    })

    return arrayOfFiles
}
let key=process.argv[3]
if(process.argv[2]=="all"){

    getAllFiles(".").forEach(file=>{
        console.log(file+".xec")
        let context=fs.readFileSync(file,"utf8")
        let encrypted=Bundle.encrypt(Bundle.compress(context),key)
        fs.writeFileSync(file+".xec",encrypted)

    })
} else{
    let context=fs.readFileSync(process.argv[2],"utf8")
    let encrypted=Bundle.encrypt(Bundle.compress(context),key)
    fs.writeFileSync(process.argv[2]+".xec",encrypted)
}
