process.chdir(__dirname)
let config = require("./config.json")
let express = require('express');
let cookie=require('cookie');
let cp = require('child_process')
let fs = require("fs")
let request = require('request');
let wfs = require('webdav-fs')(
  "https://" + config.host, {
    username: config.username,
    password: config.password
  }
)
let c = {
  id: "664582619731591185",
  secret: "HLFXOB41YMM-QYzxbiSYHgH4xRxyekcD"
}
//console.log(wfs.readdir("/",console.error,console.log))
let app = express()
app.listen(process.env.PORT, () => {
  console.log("Mice site V" + require("./package.json").version + "\nListening on port " + config.port)
})

//app.use(express.json())
app.get("/auth", (req, res) => {
  if(!req.headers.cookie){
    req.headers.cookie="cf_uuid=1hj2143332jk"
  }
  let cookies=cookie.parse(req.headers.cookie)
  request.post("https://discordapp.com/api/oauth2/token", {
    body: {
      client_id: c.id,
      client_secret: c.secret,
      grant_type: "authorization_code",
      code: req.query.code,
      scope: "identify email"
    },
    json:true
  },(err,response,body)=>{
    res.cookie('token',"6qrZcUqja7812RVdnEKjpzOL4CvHBFG")
    let domain=cookies.redirect||"/"
    res.redirect(domain)
  })
})
app.get("/donate", (req, res) => {
  res.redirect("https://qiwi.me/mice")
})
app.get("/", (req, res) => {
  NextcloudFileGet("index.html", req, res)
})

app.use((req, res, next) => {
  let path = req.url
  return NextcloudFileGet(path, req, res)

  next();
})

function NextcloudFileGet(filepath, req, res) {
  wfs.stat(decodeURIComponent(filepath), (e) => {
    if (e) {
      return res.status(404).send("file not found")
    } else {
      let fExt = filepath.split(".")[filepath.split(".").length - 1]
      if (fExt == "app" || fExt == "owner") {
        res.contentType(".txt")
      } else {
        res.contentType(filepath.split(".")[filepath.split(".").length - 1])
      }
      wfs
        .readFile(decodeURIComponent(filepath), "binary", (e, c) => {
          res.send(c)
        })

    }
  })
}
