const url=require('fs')
require('dotenv').config()


const user_db_connect=url.readFileSync(process.env.user_db)
const users=JSON.parse(user_db_connect)
const qoutes_db_connect=url.readFileSync(process.env.qoutes_db)
const qoutes=JSON.parse(qoutes_db_connect)
const chat_db_conn=url.readFileSync(process.env.chat_db)
const chats=JSON.parse(chat_db_conn)

module.exports={users,qoutes,chats,url}







