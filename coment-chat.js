const dotenv=require('dotenv')
dotenv.config()


const {qoutes,chats,url}=require(process.env.router)
const {user_get}=require(process.env.user_server)
const {hours,day}=require(process.env.time)
const {ambilTigaKataPertama}=require(process.env.teks)
const {encryptVigenere}=require(process.env.enkripsi_data)



function post_coment(data){
const user_data=user_get(data.user_email)[0]
const qoutes_data=qoutes.filter(get=>get.qoutes_id===data.qoutes_id)[0]
const coment_data={
   username:user_data.username,
   value:data.coment_input,
   
}
qoutes_data.coment_list.push(coment_data)
url.writeFileSync(process.env.qoutes_db,JSON.stringify(qoutes))

}



function create_newChat(data,type,qoutes_id){
  const data_address={
     user:user_get(data.user_email)[0],
     reciepent:user_get(data.reciepent_email)[0]
  }
  const chat_data={
      user:{
          address:data_address.user.email,
          name:data_address.user.username
      },
      reciepent:{
          address:data_address.reciepent.email,
          name:data_address.reciepent.username
      },
      chat:{
          room:encryptVigenere(`${ambilTigaKataPertama(data.chat_text)}${data_address.user.email}${data_address.reciepent.email}`,
          `chat${data_address.user.password}`),
          room_d:`${ambilTigaKataPertama(data.chat_text)}${data_address.user.email}${data_address.reciepent.email}`,
          chat_value:ambilTigaKataPertama(data.chat_text),
          qoutes_id:qoutes_id,
          time:`${hours.h}:${hours.m}`,
          day:`${day.d}/${day.m}/${day.y}`,
          type:type,
      },
    chat_list:[{email:data_address.user.email,value:data.chat_text}]
  }
  chats.push(chat_data)
  url.writeFileSync(process.env.chat_db,JSON.stringify(chats))

}



function get_chatSend(user){
    const chat=chats.filter(data=>data.user.address.includes(user))
    return chat
}
function get_chatReciepent(user){
    const chat=chats.filter(data=>data.reciepent.address.includes(user))
    return chat
}
function search_chatSend(chats,key_word){
    const chat=chats.filter(data=>data.chat.chat_value.includes(key_word))
    return chat
}

function search_chatAccept(chats,key_word){
    const chat=chats.filter(data=>data.chat.chat_value.includes(key_word))
    return chat
}

function get_chat(room){
const chat=chats.filter(data=>data.chat.room.includes(room))
return chat
}



function get_chatList(room){
    const chat=chats_list.filter(data=>data.room.includes(room))
    return chat
}


function send_chat(input){
    const chat__data={
         email:input.user_email,
         value:input.chat_text,

    }
   const chat_dat=chats.filter(get=>get.chat.room.includes(input.room))[0]
   chat_dat.chat_list.push(chat__data)
    url.writeFileSync(process.env.chat_db,JSON.stringify(chats))
}

function delete_chat(chat_input){
    const chat_after=chats.filter(data=>data.chat.chat_value != chat_input.chat)
    url.writeFileSync(process.env.chat_db,JSON.stringify(chat_after))
}




module.exports={
    post_coment,
    create_newChat,
    get_chatSend,
   get_chatReciepent,
   search_chatSend,
   search_chatAccept,
   get_chat,
   send_chat,
   delete_chat,
}

