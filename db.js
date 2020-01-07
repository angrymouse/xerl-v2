module.exports=(token)=>{

  let faunadb=require("faunadb")
  let $=faunadb.query
  let fdb=new faunadb.Client({secret:token})
  let client=fdb;
  let q=$;

  function dbFindOne(collection,by,value,cb){
   fdb.query(

    $.Get($.Match($.Index(collection+"_"+by),value))
           ).then(cd=>{cb(null,cd)}).catch(err=>{return cb(err,null)})
  }
  function dbFind(collection,by,value,cb){
  fdb.query(
    $.Map(
    $.Paginate(
       $.Match($.Index(collection+"_"+by),value)
    ),
    $.Lambda("X", $.Get($.Var("X")))
  )
    ).catch(err=>{return cb(err,null)}).then(cd=>{cb(null,cd)})
  }
  function dbFindAndUpdate(objToUpdate,toUpdate,cb){
   fdb.query(
    $.Update(
       objToUpdate,
      { data: toUpdate },
    )

           ).then(cd=>{cb(null,cd)}).catch(err=>{return cb(err,null)})
  }
  function dbInsert(collection,obj,cb){
     fdb.query(
    $.Create(
      q.Collection(collection),
      {
        data: obj,
      }
    )
  ).then(cd=>{cb(null,cd)}).catch(err=>{return cb(err,null)})
  }
  return {
    insert:dbInsert,
    find:dbFind,
    findOne:dbFindOne,
    updateOne:dbFindAndUpdate
  }
}
