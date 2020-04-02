const fs=require("fs"),
    Bundle=require("./xb")
let context=fs.readFileSync(process.argv[2],"utf8")
let encrypted=Bundle.encrypt(Bundle.compress(context),process.argv[3])
fs.writeFileSync(process.argv[2]+".xec",encrypted)
