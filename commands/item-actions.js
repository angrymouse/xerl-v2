module.exports = async (args, message) => {
    if(!message.member.hasPermission("ADMINISTRATOR")){
        return message.channel.sendEm("You must have permission ``ADMINISTRATOR`` to use this command!")
    }
    let reqitem;
    if (args.length < 1) {
        reqitem = await message.channel.createMC(message.author, "Enter item name:")
    } else {
        reqitem = args.join(" ")
    }
    let shop = await require("../utils/getshop")(message.guild.id)
   let items= shop.items.filter(item => {
        return item.name.toLowerCase().startsWith(reqitem.toLowerCase())
    })
    let item;
    if(items.length<1){
        return message.channel.send("There isn't item matches with name you provided! Use ``create-item`` for making items!")
    }else if(items.length>1){
        let desc=``
        items.forEach((itemobj,itemind)=>{
            desc+="\n"+(itemind+1)+" - "+itemobj.name
        })
        let reply=await message.channel.createMC(message.author,new Discord.RichEmbed()
            .setColor(ec)
            .setTitle("Select item")
            .setDescription(desc)
            .setFooter("Send to this channel message with index (number) of item.")
            .setAuthor(client.user.username,client.user.avatarURL)
        )
        if(isNaN(reply)){
            return message.channel.sendEm("Reply isn't correct number!")
        }else{
            reply--
            if(!items[reply]){
                return message.channel.sendEm("This index isn't listed!")
            }else{
               item=items[reply]
            }
        }
    }else{
        item=items[0]
    }
    si(item,message,shop,items)
}
async function si(item,message,shop,items) {
    console.log(item)
    let desc=''
let events=["Buy","Sell","Transfer","Abort","Use"]
    events.forEach((evname,evi)=>{
        desc+="\n"+(evi+1)+" - "+evname
    })
let event=await message.channel.createMC(message.author,new Discord.RichEmbed()
    .setColor(ec)
    .setTitle("Select event")
    .setDescription(desc)
    .setFooter("Send to this channel message with index (number) of event.")
    .setAuthor(client.user.username,client.user.avatarURL)
)

    if(isNaN(event)){
        return message.channel.sendEm("Reply isn't correct number!")
    }else{
        event--
        if(!events[event]){
            return message.channel.sendEm("This index isn't listed!")
        }else{
            let actions=["Delete action","Create action"]
            desc=''
            actions.forEach((aname,avi)=>{
                desc+="\n"+(avi+1)+" - "+aname
            })
            let action=await message.channel.createMC(message.author,new Discord.RichEmbed()
                .setColor(ec)
                .setTitle("What you want to do?")
                .setDescription(desc)
                .setFooter("Send to this channel message with index (number) of listed action.")
                .setAuthor(client.user.username,client.user.avatarURL)
            )
            if(isNaN(action)){
                return message.channel.sendEm("Reply isn't correct number!")
            }else{
                switch (action) {
                    case "1":
                        deleteItem(item,message,shop,{
                            event:events[event].toLowerCase()

                        },items)
                        break;
                    case "2":
                        createItem(item,message,shop,{
                            event:events[event].toLowerCase()

                        },items)
                        break;
                    default:
                        return message.channel.sendEm("This index isn't listed!")
                        break;
                }

            }
        }
    }

}
async function deleteItem(item,message,shop,answers,items) {
// console.log(item)
if(!item.events[answers.event]||item.events[answers.event].length<1){
    return message.channel.sendEm("There isn't any actions for this item!")
}else {
let desc=""
    item.events[answers.event].forEach((action,ai)=>{
        desc+=(ai+1)+" - "+action.act+"("+action.argument+")\n"

    })
    let action=await message.channel.createMC(message.author,
        new Discord.RichEmbed()
            .setColor(ec)
            .setTitle("Select action")
            .setDescription(desc)
            .setFooter("Send to this channel message with index (number) of action.")
            .setAuthor(client.user.username,client.user.avatarURL)

    )
    if(isNaN(action)){
        return message.channel.sendEm("Reply isn't correct number!")
    }else {
        action--
        if (!item.events[answers.event][action]) {
            return message.channel.sendEm("This index isn't listed!")
        }else{

            item.events[answers.event].splice(action,1)
            let ii=shop.items.findIndex(itm=>itm.id===item.id)
            if(!item.events[answers.event.toLowerCase()]){item.events[answers.event.toLowerCase()]=[]}
            shop.items[ii]=item;
            db.collection('shops').updateOne({_id:shop._id},{$set:shop})
            message.channel.send(
                new Discord.RichEmbed()
                    .setColor(ec)
                    .setTitle("Item actions edited!")
                    .setDescription(`Action for item \`\`${item.name}\`\` which triggers on \`\`${answers.event}\`\` successfully erased!`)
                    .setFooter("Xerl Economy")
            )
        }
    }
}
}
async function createItem(item,message,shop,answers,items) {
    desc=''
    let acts=["Ban user","Send message","Kick user","Create channel","Delete channel"]
    acts.forEach((x1,x2)=>{
        desc+="\n"+(x2+1)+" - "+x1
    })

    let act=await message.channel.createMC(message.author,
        new Discord.RichEmbed()
            .setColor(ec)
            .setTitle("Select act")
            .setDescription(desc)
            .setFooter("Send to this channel message with index (number) of act.")
            .setAuthor(client.user.username,client.user.avatarURL)

    )
    if(isNaN(act)){
        return message.channel.sendEm("Reply isn't correct number!")
    }else {
        act--
        if (!acts[act]) {
            return message.channel.sendEm("This index isn't listed!")
        }
    }
let action;
    desc=""
    switch (acts[act]) {
        case "Ban user":
            desc="Okay, mention user for ban or use ``$buyer`` to ban buyer, ``$random`` for ban random user, and ``$select`` for allow buyer select himself."
            action="banuser"
            break;
        case "Create channel":
            desc="Okay, provide channel name or use ``$buyer`` to use buyer username as channel name, ``$random`` for use random string as channel name, and ``$select`` for allow buyer select himself."
            action="createchannel"
            break;
        case "Delete channel":
            desc="Okay, mention channel for delete or use ``$random`` for delete random channel, and ``$select`` for allow buyer select himself."
            action="deletechannel"
            break;
        case "Kick user":
            desc="Okay, mention user for kick or use ``$buyer`` to kick buyer, ``$random`` for kick random user, and ``$select`` for allow buyer select himself."
            action="deleteuser"
            break;
        case "Send message":
            desc="Okay, provide message. \nNote: use ``$buyer`` for mention buyer, ``$purchaseChannel`` for mention purchase channel, ``$serverName`` as name of guild, ``$price`` as item price, and ``$itemName`` as item name."
            action="sendmessage"
            break;
    }
    let arg=await message.channel.createMC(message.author,new Discord.RichEmbed()
        .setColor(ec)
        .setAuthor(client.user.username,client.user.avatarURL)
        .setFooter("Send argument here")
        .setDescription(desc)
    )
    let ii=shop.items.findIndex(itm=>itm.id===item.id)
    if(!item.events[answers.event.toLowerCase()]){item.events[answers.event.toLowerCase()]=[]}
    item.events[answers.event.toLowerCase()].push({
        id:makeid(40),
        act:action,
        argument:arg
    })
    shop.items[ii]=item;
    db.collection('shops').updateOne({_id:shop._id},{$set:shop})
    message.channel.send(
        new Discord.RichEmbed()
            .setColor(ec)
            .setTitle("Item actions edited!")
            .setDescription(`Created action for item \`\`${item.name}\`\` which triggers on \`\`${answers.event}\`\` event and executes act \`\`${action}\`\` with argument \`\`${arg}\`\`.`)
            .setFooter("Xerl Economy")
    )
}
