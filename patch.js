let fs = require('fs');
let archiver = require('archiver');
const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
let key = 'Xerl11bestBot';
key = crypto.createHash('sha256').update(key).digest('base64').substr(0, 32);
const encrypt = (buffer) => {
    // Create an initialization vector
    const iv = crypto.randomBytes(16);
    // Create a new cipher using the algorithm, key, and iv
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    // Create the new (encrypted) buffer
    const result = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);
    return result;
};
let archive = archiver('zip', {
    zlib: { level: 9 } // Sets the compression level.
});
let patchctx=require("./patchfile.json")
let output = fs.createWriteStream(__dirname + '/patch.xerlpatch');
archive.on("data",d=>{
    output.write(encrypt(d))
})
archive.append(fs.createReadStream("patchfile.json"), { name: 'patchfile.json' });
archive.append(fs.createReadStream("patchfile.sh"), { name: 'patchfile.sh' });
patchctx.files.forEach(f=>{
    if(f.dir){
        archive.directory(f.name,false)

    }else{
        archive.append(fs.createReadStream(__dirname+"/"+f.name),{name:f.name})
    }
})

archive.finalize();