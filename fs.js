process.chdir(__dirname)
let config = require("./config.json")
let express = require('express');
let cp = require('child_process')
let fs = require("fs")
let wfs = require('webdav-fs')(
  "https://"+config.host, {
    username: config.username,
    password: config.password
  }
)
//console.log(wfs.readdir("/",console.error,console.log))
let app = express()
app.listen(process.env.PORT, () => {
  console.log("Mice site V" + require("./package.json").version + "\nListening on port " + config.port)
})

//app.use(express.json())

app.get("/", (req, res) => {
  NextcloudFileGet("index.html", req, res)
})

app.use((req,res,next)=>{
    let path=req.url
  return NextcloudFileGet(path,req,res)

  next();
})

function NextcloudFileGet(filepath, req, res) {
  wfs.stat(decodeURIComponent(filepath), (e) => {
    if (e) {
      return res.status(404).send("file not found")
    } else {
      let fExt=filepath.split(".")[filepath.split(".").length-1]
      if(fExt=="app"||fExt=="owner"){
      res.contentType(".txt")
      }else{
      res.contentType(filepath.split(".")[filepath.split(".").length-1])
      }
      wfs
        .readFile(decodeURIComponent(filepath),"binary",(e,c)=>{res.send(c)})

    }
  })
}
