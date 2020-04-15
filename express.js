const express = require("express")
let app = require("express")()
app.listen(port)
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/", (req, res) => {
    res.send("Xerl API v 2.0.1")
})
app.get("/topp-api/user/:token", (req, res) => {
    request.get("https://discordapp.com/api/v6/users/@me", {
        headers: {
            authorization: "Bearer " + req.params.token
        }, json: true
    }, (err, resp, body) => {
        db.collection("profile").findOne({id: body.id}, (err, profile) => {
            if (profile == null) {
                db.collection("profile").insertOne({
                    id: body.id,
                    army: {},
                    humans: {human: 5},
                    lastTribute: 0,
                    money: 0,
                    email: body.email
                })

            } else {
                db.collection("profile").findOneAndUpdate({id: body.id}, {$set: {email: body.email}})
            }
            res.json(body)
        })
    })
})
app.get("/genauth", (req, res) => {
    if (!req.query.rlink) {
        return
    }
    res.cookie("rlink", req.query.rlink)
    res.redirect("https://discordapp.com/api/oauth2/authorize?client_id=540187298403450891&redirect_uri=https%3A%2F%2Fxerl-xerl-miceve.cloud.okteto.net%2Fauth&response_type=code&scope=identify%20email%20connections")
})
app.get("/auth", (req, res) => {

    if (!req.headers.cookie) {
        return res.send("not ok!")
    }
    let cookies = require("cookie").parse(req.headers.cookie)
    if (!cookies.rlink || cookies.rlink == "") {
        return res.send("not ok!")
    }
    if (!req.query.code) {
        return res.send("not ok!")
    }

    request.post("https://discordapp.com/api/oauth2/token", {
        form:
            {
                code: req.query.code,
                client_id: "540187298403450891",
                client_secret: "nwxh37o6KUfLAKSyg6jA9f2r8ryjgVhI",
                grant_type: "authorization_code",
                redirect_uri: "https://xerl-xerl-miceve.cloud.okteto.net/auth",
                scope: "identify"
            }, json: true
    }, (err, head, body) => {
        res.redirect(cookies.rlink + "#xc:" + body.access_token)
    })

})
