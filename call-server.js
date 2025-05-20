require('dotenv').config()
const {users,chats,url}=require(process.env.router)
const  { hours, day }=require(process.env.time)


function get_callingProcess(address){
  users.filter(data=>data.email.includes(address.user.email))[0].calls={
     reciepent:{username:address.reciepent.username,email:address.reciepent.email},
     calling:'',
     status:'calling-processing'
  }
  users.filter(data=>data.email.includes(address.reciepent.email))[0].calls={
      calling:{username:address.user.username,email:address.user.email},
      reciepent:'',
      status:'calling-processing'
  }
  url.writeFileSync(process.env.user_db,JSON.stringify(users))
}





function call_accept_open(address){
   users.filter(data=>data.email.includes(address.user.email))[0].calls.status='calling-running'
    users.filter(data=>data.email.includes(address.user.email))[0].calls.mic='turning-off'
   users.filter(data=>data.email.includes(address.calling.email))[0].calls.status='calling-running'
   users.filter(data=>data.email.includes(address.calling.email))[0].calls.mic='turning-off'
url.writeFileSync(process.env.user_db,JSON.stringify(users))
  }


function call_cancelled(address){
    users.filter(data=>data.email.includes(address.user.email))[0].calls=''
    users.filter(data=>data.email.includes(address.reciepent.email))[0].calls=''
    url.writeFileSync(process.env.user_db,JSON.stringify(users))
}

function  mic_setting(user,mic_setting){
  users.filter(data=>data.email.includes(user.email))[0].calls.mic=mic_setting
  url.writeFileSync(process.env.user_db,JSON.stringify(users))
}


function end_call(call_data){
  users.filter(data=>data.email.includes(call_data.user.email))[0].calls=''
  users.filter(data=>data.email.includes(call_data.reciepent.email))[0].calls=''

  const call_record={
     user:{
          address:call_data.user.email,
          name:call_data.user.username
      },
      reciepent:{
          address:call_data.reciepent.email,
          name:call_data.reciepent.username
      },
      chat:{
          room:`${hours.h}${hours.m}_${day.d}${day.m}${day.y}I${call_data.user.email}To${call_data.reciepent.email}Type_call_record`,
          chat_value:'obrolan selesai ',
          qoutes_id:''
          
      },
      information:{
        time:`${hours.h}:${hours.m}`,
        day:`${day.d}/${day.m}/${day.y}`,
        type:'call-record',
        
    }
  }

   chats.push(call_record);
    url.writeFileSync(process.env.user_db,JSON.stringify(users))
    url.writeFileSync(process.env.chat_db,JSON.stringify(chats))
  }

function rejecting_processing(user){
  users.filter(data=>data.email.includes(user.email))[0].calls.status='rejected-process'
  url.writeFileSync(process.env.user_db,JSON.stringify(users))
}

function calling_rejected(address,body){
  users.filter(data=>data.email.includes(address.user.email))[0].calls=''
  users.filter(data=>data.email.includes(address.calling.email))[0].calls=''

const call_record={
   user:{
          address:address.user.email,
          name:address.user.username
      },
      reciepent:{
          address:address.calling.email,
          name:address.calling.username
      },
      chat:{
          room:`${hours.h}${hours.m}_${day.d}${day.m}${day.y}I${address.user.email}To${address.calling.email}Type_call_record`,
          chat_value:body.reject_reason,
          qoutes_id:''
          
      },
      information:{
        time:`${hours.h}:${hours.m}`,
        day:`${day.d}/${day.m}/${day.y}`,
        type:'call-record',
        
    }
}
  chats.push(call_record)
 url.writeFileSync(process.env.user_db,JSON.stringify(users))
url.writeFileSync(process.env.chat_db,JSON.stringify(chats))
}

module.exports={get_callingProcess,call_accept_open,call_cancelled, mic_setting,end_call, rejecting_processing, calling_rejected}