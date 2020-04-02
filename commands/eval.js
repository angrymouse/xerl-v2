module.exports =  (args, message) => {

    if (message.author.id == "343046183088029696") {
        try {
            let result = eval(args.join(" "));
            message.channel.sendEm(result)
        } catch (err) {
            message.channel.sendEm(err)
        }
    }
};
