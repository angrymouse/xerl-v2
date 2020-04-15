jimp.read("https://xer.l.co.ua/host/343046183088029696/QkPUlP0pP0JD1JT9KT9CQ9adEPQh7EnYi6El6kp6kJlJepKepCfpSXqSnqQn6Ul6kp6kJlJepKepCfpSXqSnqQn6Ul60n4If8ynh.png")
    .then(gayFlag => {
        global.gayFlag = gayFlag
    })
jimp.read("https://xer.l.co.ua/host/343046183088029696/KAFNIK-3-x-5-FT-90-150cm-60-90cm-Communism-Flag-Marx-Engels-Lenin-Stalin-CCCP.png")
    .then(communism => {
        global.communismFlag = communism
    })
jimp.read("https://xer.l.co.ua/host/343046183088029696/unknown.png")
    .then(img => {
        img.resize(125, 125)
        global.xerlHand = img
    })

