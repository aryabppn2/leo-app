require('dotenv').config()
const {admin,url}=require('./routes.js')
const {user_get}=require('./account-server.js')

function Create_adminAcc(data_account){
const user=user_get(data_account.admin_email)[0]
const admin_data={
 username:user.username,
 email:user.email,
 password:data_account.admin_password
}
admin.push(admin_data)
url.writeFileSync(process.env.admin_db,JSON.stringify(admin))

}

function admin_get(email_data){
const admin_data=admin.filter(data=>data.email.includes(email_data))
return admin_data
}



module.exports={Create_adminAcc,admin_get}