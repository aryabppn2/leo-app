const dotenv=require('dotenv')
dotenv.config()


const {coments,chats,chats_list,url}=require(process.env.router)
const {user_get}=require(process.env.user_server)
const {hours,day}=require(process.env.time)


function post_coment(data){
const user_data=user_get(data.user_email)[0]
const coment_data={
   username:user_data.username,
   email:user_data.email,
   qoutes_id:data.qoutes_id,
   value:data.coment_input,
   
}
coments.push(coment_data)
url.writeFileSync(process.env.coment_db,JSON.stringify(coments))

}

function get_coments(qoutes){
   const coment=coments.filter(data=>data.qoutes_id.includes(qoutes))
   return coment
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
          room:`chat_${data.chat_text}Wr${data_address.user.email}To${data_address.reciepent.email}Type${type}`,
          chat_value:data.chat_text,
          qoutes_id:qoutes_id
          
      },
      information:{
        time:`${hours.h}:${hours.m}`,
        day:`${day.d}/${day.m}/${day.y}`,
        type:type,
        
    }
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
         room:input.room,
         value:input.chat_text,

    }
    chats_list.push(chat__data)
    url.writeFileSync(process.env.chat_list,JSON.stringify(chats_list))
}

function delete_chat(chat){
    const chat_data=chats.filter(data=>data.chat.room !=chat.room)
    const chat_list=chats_list.filter(data=>data.room !=chat.room)

    url.writeFileSync(process.env.chat_db,JSON.stringify(chat_data))
    url.writeFileSync(process.env.chat_list,JSON.stringify(chat_list))
}


function get_alt(coment,alt){
    const coment_data=coment.filter(data=>data.value.includes(alt))
    return coment_data
}

module.exports={
    post_coment,
    get_coments,
    create_newChat,
    get_chatSend,
   get_chatReciepent,
   search_chatSend,
   search_chatAccept,
   get_chat,
   send_chat,
   get_chatList,
   delete_chat,
   get_alt
}

