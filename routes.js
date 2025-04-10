const url=require('fs')
require('dotenv').config()


const user_db_connect=url.readFileSync(process.env.user_db)
const users=JSON.parse(user_db_connect)
const qoutes_db_connect=url.readFileSync(process.env.qoutes_db)
const qoutes=JSON.parse(qoutes_db_connect)
const coment_db_conn=url.readFileSync(process.env.coment_db)
const coments=JSON.parse(coment_db_conn)
const chat_db_conn=url.readFileSync(process.env.chat_db)
const chats=JSON.parse(chat_db_conn)
const chat_list_conn=url.readFileSync(process.env.chat_list)
const chats_list=JSON.parse(chat_list_conn)
const share_db_conn=url.readFileSync(process.env.share_db)
const share_datas=JSON.parse(share_db_conn)


module.exports={users,qoutes,share_datas,coments,chats,chats_list,url}







