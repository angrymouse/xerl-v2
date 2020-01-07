module.exports=(args,message)=>{
  let imgurId="23b1f61dcfdba61"
const url = `https://api.imgur.com/3/gallery/search/top/1/?q_tags=meme`
request.get(url,{headers: {Authorization: `Client-ID ${imgurId}`},json:true},(err,res,body)=>{

  message.channel.send(body.data.random().link)
})
return
}
