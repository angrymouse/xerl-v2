module.exports=async (input,update)=>{
    let balance = await require("../utils/geteconomy-autonome")(input.g, input.u)
    return await db.collection("economy").updateOne({_id:balance._id},{$set:update})
}
