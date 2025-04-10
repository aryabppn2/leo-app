
const dotenv=require('dotenv')
dotenv.config

const {qoutes,share_datas,coments,url}=require(process.env.router)
const {hours,day}=require(process.env.time)


function post_qoutes(data,type){
  const qoutes_data={
    qoutes_email:data.email,
    qoutes_id:`writeQoutes${data.qoutes_value}WrBy${data.email}`,
    information:{
       time:`${hours.h}:${hours.m}`,
       day: `${day.d}/${day.m}/${day.y}`,
       color:data.sign_color,
       bgcolor:data.bg_color,
       font_size:data.fontSize,
       font_family:data.fontFamily,
       type:'qoutes-short'
    },
    qoutes_value:data.qoutes_value
  }

if(data.sign_color==""){
  qoutes_data.information.color='orange'
  qoutes.push(qoutes_data)
}
else if(data.bg_color==""){
  qoutes_data.information.bgcolor='yellow'
  qoutes.push(qoutes_data)
}

else{
qoutes.push(qoutes_data)
}


url.writeFileSync(process.env.qoutes_db,JSON.stringify(qoutes))
}

function post_qoutesShare(user){
  const qoutes_sh=qoutes.filter(data=>data.qoutes_id.includes(user.qoutes_id))[0]
  const qoutes_data={
      qoutes_email:user.user_email,
      qoutes_id:`writeQoutesShare${user.qoutes_value}WrBy${user.user_email}From${user.qoutes_id}`,
      information:{
        time:`${hours.h}:${hours.m}`,
        day: `${day.d}/${day.m}/${day.y}`,
        color:user.sign_color,
        bgcolor:user.bg_color,
        type:'qoutes-share',
      },
      qoutes_share:{
        qoutes_id:user.qoutes_id,
        qoutes_bg:qoutes_sh.information.bgcolor,
        qoutes_color:qoutes_sh.information.color,
        qoutes_value:qoutes_sh.qoutes_value
      },
      qoutes_value:user.qoutes_value
  }
  share_datas.push(qoutes_data)
  url.writeFileSync(process.env.share_db,JSON.stringify(share_datas))
}

function delete_product(qoute) {
  const qoutes_get = qoutes.filter((data) => data.qoutes_id !=qoute);
  const coment_get=coments.filter(data=> data.qoutes_id !=qoute)
  url.writeFileSync(process.env.qoutes_db, JSON.stringify(qoutes_get));
  url.writeFileSync(process.env.coment_db,JSON.stringify(coment_get))
}


function delete_qoutesShare(qoute){
  const qoutes_data=share_datas.filter(data=>data.qoutes_id!=qoute)
  url.writeFileSync(process.env.share_db,JSON.stringify(qoutes_data))
}
function update_qoutes(qoute) {
  const product_data = qoutes.filter((data) =>
    data.qoutes_id.includes(qoute.qoutes_id)
  )[0];
  product_data.qoutes_value=qoute.qoutes_value;
  product_data.information.color=qoute.sign_color;
  product_data.information.bgcolor=qoute.bgcolor
  url.writeFileSync(process.env.qoutes_db,JSON.stringify(qoutes));
}

function qoutes_get(qoute){
   const qoutes_data=qoutes.filter(data=>data.qoutes_id.includes(qoute))
  return qoutes_data
}
function share(qoute){
  const share_data=share_datas.filter(data=>data.qoutes_id.includes(qoute))
  return share_data
}

function get_userProductList(email) {
  const product_data = qoutes.filter((data) =>
    data.qoutes_email.includes(email)     
  );
  return product_data;
}
function get_userShareList(user){
  const qoute_list=share_datas.filter(data=>data.qoutes_email.includes(user))
  return qoute_list
}

function get_searchUserProduct(products, key_word) {
  const product_get = products.filter((data) =>
    data.qoutes_value.includes(key_word)
  );
  return product_get;
}
function get_productNav(email) {
  const product_data = qoutes.filter((data) => data.qoutes_email != email);
  return product_data;
}
function qoutesShare_nav(email){
 const qoutes=share_datas.filter(data=>data.qoutes_email !=email)
 return qoutes
}


module.exports = {
  post_qoutes,
  post_qoutesShare,
  delete_product,
  delete_qoutesShare,
  update_qoutes,
  qoutes_get,share,
  get_userProductList,
  get_userShareList,
  get_searchUserProduct,
  get_productNav,
  qoutesShare_nav
};
