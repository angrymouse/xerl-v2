module.exports = async (guild, user,channel) => {
    return new Promise((resolve, reject) => {
        db.collection("economy").findOne({guild: guild, user: user}, async (err, doc) => {
            if (doc == null) {
                doc = await db.collection("economy").insertOne({
                        "guild": guild,
                        "user": user,
                        "xp": 1,
                        "money": 0,
                        "rank": 1
                    }
                )

            }
            resolve(doc)
        })
    })
}
