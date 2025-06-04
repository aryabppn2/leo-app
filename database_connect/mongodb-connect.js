const {MongoClient}=require('mongodb')

 const uri='mongodb://localhost:27017'
   const client =new MongoClient(uri)
  const db=client.db('leo')


async function mongodb_connect(){
 try{
 await client.connect()
 console.log('berhasil terkoneksi dengan database mongodb')
 }
 catch(err){
   console.error('tidak terkoneksi dengan database mongodb karena'+err)
 }

}




module.exports={mongodb_connect,db}