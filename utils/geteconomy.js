module.exports = async (guild, user,channel) => {
    return new Promise((resolve, reject) => {
        db.collection("economy").findOne({guild: guild, user: user}, async (err, doc) => {
            if (doc == null) {
                doc=await db.collection("economy").insertOne({
                        "guild": guild,
                        "user": user,
                        "xp": 1,
                        "money": 0,
                        "rank": 1
                    }
                )

            }
            resolve(doc)
            if(doc.xp>doc.rank*50){
                doc.xp=1
                doc.rank++

      ranks.get(guild).emit("newRank",client.users.get(user),client.channels.get(channel),doc.rank)

                require("./updeconomy")({g:guild,u:user},doc)
            }


        })
    });
};
