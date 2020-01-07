module.exports = (args, message) => {
  let players
  if (!message.mentions.members.first()) {
    return message.reply("Pls mention member to fight.")
  } else {
    players = [{
      player: message.author.id,
      hp: 100
    }, {
      player: message.mentions.members.first().user.id,
      hp: 100
    }]
  }
  message.channel.send(message.mentions.members.first()+", do you accept "+message.author+"'s call? (Yes/no, y/n)")
  acceptionCollector = message.channel.createMessageCollector((m)=>{
    return m.author.id==message.mentions.members.first().user.id&&(["yes", "no","y","n"]
    .some(answer => answer.toLowerCase() === m.content.toLowerCase()))
  }, {
    time: 50000
  });
  acceptionCollector.once("collect",(m)=>{
    if(["y","yes"].includes(m.content.toLowerCase())){

      if(Math.rand(0,1)==1){
        players.reverse()
      }
      message.channel.send(client.users.get(players[0].player) + " your step", new Discord.RichEmbed()
        .addField(client.users.get(players[0].player).tag + " ❤️", players[0].hp)
        .addField(client.users.get(players[1].player).tag + " ❤️", players[1].hp)).then(msg => {
        fight(players, msg)
      })
      const filter = response => {
        return (["hit", "heal"].some(answer => answer.toLowerCase() === response.content.toLowerCase())) && response.author.id == players[0].player
      };

      function fight(players, message) {
        const collector = message.channel.createMessageCollector(filter, {
          time: 50000
        });
        collector.once('collect', m => {
          if (players[0].hp < 1) {
            return message.edit(client.users.get(players[1]) + " win! My congratulations!")
          } else if (players[1].hp < 1) {
            return message.edit(client.users.get(players[0]) + " win! My congratulations!")
          } else if (players[0].hp > 100) {
            players[0].hp = 100
          } else if (players[1].hp > 100) {
            players[1].hp = 100
          }
          m.content = m.content.toLowerCase();
          if (m.content == "hit") {
            players[1].hp -= Math.rand(1, 34)
          } else {
            players[0].hp += Math.rand(1, 34)
          }
          players.reverse()
          message.edit(client.users.get(players[0].player) + " your step", new Discord.RichEmbed()
            .addField(client.users.get(players[0].player).tag + " ❤️", players[0].hp)
            .addField(client.users.get(players[1].player).tag + " ❤️", players[1].hp)).then(msg => {
            fight(players, message)
          })
        });
      }

    }else{
      message.reply(m.author+" don't want battle with you")
    }
  })
}
