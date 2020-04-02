module.exports=async (text,type)=>{
    return new Promise(async (resolve,reject)=>{
        switch (type) {
            case 1:
                request.post("https://models.dobro.ai/gpt2/medium/", {
                    body: JSON.stringify({
                        prompt:text,
                        length:60,
                        num_samples:5
                    }),
                    headers:{
                        "Content-Type": "text/plain;charset=UTF-8"
                    }
                },(err,res,body)=>{

                    body=JSON.parse(body)

                    if(!body.replies){reject("I can't complete your text!")}else{
                        resolve(text+body.replies.random())
                    }

                })
                break;
            case 2:

                text+=await gen2(text)
                text+=await gen2(text)
            resolve(text)
            break;
        }
    })
}
async function gen2(text) {
    return new Promise((resolve,reject)=>{
        request.post("https://transformer.huggingface.co/autocomplete/gpt2/medium",{
            json:true,
            body:{
                context:text,
                model_size:"gpt2/medium",
                top_p: 1,
                length:60,
                temperature:2,
                max_time:5
            }
        },(err,res,body)=>{

            if(err){console.log(err)}
            if(body.sentences) {
                resolve(body.sentences.random().value)
            }else{console.log(res)}
        })
    })

}
