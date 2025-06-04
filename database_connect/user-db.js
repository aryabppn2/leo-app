const {mongodb_connect,db}=require('./mongodb-connect.js')


mongodb_connect()


async function showAllData(){
try{
const collection=db.collection('user_db');
const users=await collection.find({}).toArray();
return users;
}
catch(err){
 console.error('tidak bisa terkoneksi ke database ')
}
}


async function user_data(address){
try{
const collection=db.collection('user_db');
return await collection.findOne({email:address}) 
}
catch(err){
return 'error tidak bisa mengambil data'
}
}

async function createUserData(user){
  const data_insert=await db.collection('user_db').insertOne(user)
     return data_insert;
}






async function updateData(email,data){
const collection=db.collection('user_db')

return await collection.updateOne({email:email},{$set:data})


}


async function userDeleteData(email){
try{
    const collection=db.collection('user_db');
    await collection.deleteOne({email:email})
    console.log(`account dengan email ${email} berhasil dihapus`)
}
catch(err){
console.error('tidak bisa menghapus data karena'+err)
}

}

async function addData(option,email,data){
  const collection=db.collection('user_db');
  if(option==='langganan'){
    return await collection.updateOne({email:email},{$push:{langganan:data}})
  }
  else if(option=='pelanggan'){
  return await collection.updateOne({email:email},{$push:{pelanggan:data}})
  }


}





module.exports={
showAllData,
user_data

}











