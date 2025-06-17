const dotenv=require('dotenv')
dotenv.config()

const {ambilTigaKataPertama}=require(process.env.teks)
const {hours, day}=require(process.env.time)
const {study,coments,url}=require(process.env.router)
const {user_get}=require('./account-server.js')


function post_studiData(data_get){
  const studi_data= {
   study_id:`${data_get.user_email}WrStd${ambilTigaKataPertama(data_get.study_value)}${hours.h}:${hours.m}_${day.d}${day.m}${day.y}`,
   study_email:data_get.user_email,
   study_value:data_get.study_value,
   information:{
     time:`${hours.h}:${hours.m}`,
     day:`${day.d}/${day.m}/${day.y}`
   },
   alternatif1:{
    nama:data_get.alternatif_1,
    kriteria:[
      {
        krt:data_get.kriteria_1,
        type:data_get.bobot_1
      },
      {
        krt:data_get.kriteria_2,
        type:data_get.bobot_2
      },
      {
        krt:data_get.kriteria_3,
        type:data_get.bobot_3
      },
      {
        krt:data_get.kriteria_4,
        type:data_get.bobot_4
      },

      
    ]
   },
   alternatif2:{
    nama:data_get.alternatif_2,
    kriteria:[
      {
        krt:data_get.kriteria_1,
        type:data_get.bobot_1
      },
      {
        krt:data_get.kriteria_2,
        type:data_get.bobot_2
      },
      {
        krt:data_get.kriteria_3,
        type:data_get.bobot_3
      },
      {
        krt:data_get.kriteria_4,
        type:data_get.bobot_4
      },
    ]
   },
   alternatif3:{
    nama:data_get.alternatif_3,
    kriteria:[
      {
        krt:data_get.kriteria_1,
        type:data_get.bobot_1
      },
      {
        krt:data_get.kriteria_2,
        type:data_get.bobot_2
      },
      {
        krt:data_get.kriteria_3,
        type:data_get.bobot_3
      },
      {
        krt:data_get.kriteria_4,
        type:data_get.bobot_4
      },
    ]
   },
   alternatif4:{
    nama:data_get.alternatif_4,
    kriteria:[
      {
        krt:data_get.kriteria_1,
        type:data_get.bobot_1
      },
      {
        krt:data_get.kriteria_2,
        type:data_get.bobot_2
      },
      {
        krt:data_get.kriteria_3,
        type:data_get.bobot_3
      },
      {
        krt:data_get.kriteria_4,
        type:data_get.bobot_4
      },
    ]
   }

  }

  study.push(studi_data)
  url.writeFileSync(process.env.study_db,JSON.stringify(study) )
  

}


function get_userStudy(user){
  const user_study=study.filter(data=>data.study_email.includes(user))
  return user_study
}

function study_get(study_id){
  const data=study.filter(st=>st.study_id.includes(study_id))
  return data
}



function study_dataList(user_address){
  const study_get=study.filter(data=>data.study_email !=user_address)
  return study_get
}


function get_searchStudy(study_data,search){
  const study=study_data.filter(data=>data.study_value.includes(search))
  return study
}


function answer_post(data_input){
const user_data=user_get(data_input.user_email)[0]
const coment_data={
      username:user_data.username,
      email:user_data.email,
      qoutes_id:data_input.study_id,
      value:data_input.name1
}
coments.push(coment_data)
url.writeFileSync(process.env.coment_db,JSON.stringify(coments))

}

module.exports={post_studiData,get_userStudy,study_get,study_dataList,get_searchStudy,answer_post}






