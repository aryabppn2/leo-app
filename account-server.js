
require('dotenv').config()
const {users,url}=require(process.env.router)
const {encryptVigenere}=require(process.env.enkripsi_data)



function account_registered(account){
    const account_data={
    	  username:`${account.email_input[0]}${account.email_input[1]}`,
    	  email:account.email_input,
    	  password:account.password_input,
          user_id_enkripsi:encryptVigenere(account.email_input+'leoappcomqoutesisreal',account.password_input+'leoappcomqoutesisreal'),
          age:account.get_age,
          style:{
             bgcolor:'orange',
             color:" #F5F5DC"
          },
          langganan:[],
          pelanggan:[],
          calls:'',
          my_notes:[]
    }



users.push(account_data)
url.writeFileSync(process.env.user_db,JSON.stringify(users))
}

function change_username(user){
    const get_user=users.filter(data=>data.email.includes(user.email_input))[0]

    get_user.username=user.username_input
    get_user.style.bgcolor=user.bgcolor
    get_user.style.color=user.color
    url.writeFileSync(process.env.user_db,JSON.stringify(users))
}
function  change_userHobi(data_input){
    const user_data=users.filter(data=>data.email.includes(data_input.user_email))
    user_data[0].hobi=data_input.hobi_get

    url.writeFileSync(process.env.user_db,JSON.stringify(users))
}
function notes_data(user_data,id){
 const notes_data=user_data.my_notes.filter(data=>data.notes_id.includes(id))
 return notes_data
}

function delete_notes(address){
   users.filter(data=>data.email.includes(address.user))[0].my_notes.filter(notes=>notes.notes_id !=address.notes)
    url.writeFileSync(process.env.user_db,JSON.stringify(users))
}

function change_des(user){
    const user_data=users.filter(data=>data.email.includes(user.email))[0]
    user_data.description=user.description_update
    url.writeFileSync(process.env.user_db,JSON.stringify(users))
}


function user_get(email){
    const user_data=users.filter(data=>data.email.includes(email))
    return user_data
}


function get_userList(email){
    const user_data=users.filter(data=>data.email !=email)
    return user_data
}

function search_userList(user,key_word){
    const user_get=user.filter(data=>data.username.includes(key_word))
    return user_get
}
function add_langganan(email){
    const data={
       user:users.filter(get=>get.email.includes(email.user))[0],
       market:users.filter(get=>get.email.includes(email.market))[0]
    }

    data.user.langganan.push({
        email:data.market.email,
        user:data.market.username
    })
    data.market.pelanggan.push({
        email:data.user.email,
        user:data.user.username
    })
    url.writeFileSync(process.env.user_db,JSON.stringify(users))
}

function remove_langganan(address){
    const data={
        user:users.filter(data=>data.email.includes(address.user))[0],
        target:users.filter(data=>data.email.includes(address.target))[0]
    }
    const user_data_after={
         user:data.user.langganan.filter(data=>data.email !=address.target),
         target:data.target.pelanggan.filter(data=>data.email !=address.user)
    }
    data.user.langganan=user_data_after.user
    data.target.pelanggan=user_data_after.target

    url.writeFileSync(process.env.user_db,JSON.stringify(users))
}


function search_langganan(langganan,username){
     const data=langganan.filter(data=>data.user.includes(username))
    return data
}

function search_pelanggan(pelanggan,username){

    const data=pelanggan.filter(data=>data.user.includes(username))
    return data
}



module.exports={
    account_registered,
    change_username,
     change_userHobi,
     notes_data,
     delete_notes,
     change_des,
     user_get,
     get_userList,
     search_userList,
    add_langganan,
remove_langganan,
search_langganan,
search_pelanggan,

}