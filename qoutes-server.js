
const dotenv=require('dotenv')
dotenv.config

const {qoutes,coments,url}=require(process.env.router) 
const {hours,day}=require(process.env.time)
const {ambilTigaKataPertama}=require(process.env.teks)

function post_qoutes(data,qoutes_type,qoutes_id){
  const qoutes_data={
    qoutes_email:data.email,
    qoutes_id:`writeQoutes${ambilTigaKataPertama(data.qoutes_value)}WrBy${data.email}Type${qoutes_type}`,
    information:{
       time:`${hours.h}:${hours.m}`,
       day: `${day.d}/${day.m}/${day.y}`,
       color:data.sign_color,
       bgcolor:data.bg_color,
       font_size:data.fontSize,
       font_family:data.fontFamily,
       market_share:data.market_share,
       type:data.type_get,
       qoutes_type:qoutes_type,
       qoutes_id:qoutes_id
    },
    qoutes_value:data.qoutes_value
  }


if(data.sign_color==""){
  qoutes_data.information.color='orange'
}
else if(data.bg_color==""){
  qoutes_data.information.bgcolor="aliceblue"
}
else if(data.market_share==""){
  qoutes_data.information.market_share=='semua'
}
else if(data.type_get==""){
  qoutes_data.information.type="bebas"
}
qoutes.push(qoutes_data)
url.writeFileSync(process.env.qoutes_db,JSON.stringify(qoutes))
}




function delete_product(qoute) {
  const qoutes_get = qoutes.filter((data) => data.qoutes_id !=qoute);
  const coment_get=coments.filter(data=> data.qoutes_id !=qoute)
  url.writeFileSync(process.env.qoutes_db, JSON.stringify(qoutes_get));
  url.writeFileSync(process.env.coment_db,JSON.stringify(coment_get))
}



function update_qoutes(qoute,qoutes_id) {
  const qoutes_data =qoutes.filter(data=>data.qoutes_id.includes(qoutes_id))[0]
  qoutes_data.qoutes_id=`writeQoutes${ambilTigaKataPertama(qoute.qoutes_value)}WrBy${qoute.email}`
  qoutes_data.qoutes_value=qoute.qoutes_value;
  qoutes_data.information.color=qoute.sign_color;
  qoutes_data.information.bgcolor=qoute.bg_color;
  qoutes_data.information.font_size=qoute.fontSize;
  qoutes_data.information.font_family=qoute.fontFamily;
  qoutes_data.information.market_share=qoute.market_share;
  qoutes_data.information.type=qoute.type_get
  url.writeFileSync(process.env.qoutes_db,JSON.stringify(qoutes));
}

function qoutes_get(qoute){
   const qoutes_data=qoutes.filter(data=>data.qoutes_id.includes(qoute))
  return qoutes_data
}


function get_userProductList(email) {
  const product_data = qoutes.filter((data) =>
    data.qoutes_email.includes(email)     
  );
  return product_data;
}
function get_productNav(email) {
  const product_data = qoutes.filter((data) => data.qoutes_email != email);
  return product_data;
}

function get_searchUserProduct(products, key_word) {
  const product_get = products.filter((data) =>
    data.qoutes_value.includes(key_word)
  );
  return product_get;
}
function qoutes_list_in(data){
const qoutes_filter=qoutes.filter(data=>data.qoutes_id !=data.qoutes)
const  qoutes_email_filter=qoutes_filter.filter(data=>data.qoutes_email !=data.user)

return qoutes_email_filter



}


module.exports = {
  post_qoutes,
  delete_product,
  update_qoutes,
  qoutes_get,
  get_userProductList,
  get_searchUserProduct,
  get_productNav,
  qoutes_list_in
};
