
const express = require("express");
const http = express();
const url = require("fs");
const dotenv = require("dotenv");
const path=require('path');
const { receiveMessageOnPort } = require("worker_threads");
//configurasi port//
dotenv.config();
const port =process.env.port;
const {users,chats}=require(process.env.router)
http.set("view engine", "ejs");
http.use(express.urlencoded({ extended: true }));
http.use(express.static(path.join(__dirname, "public")));


//file configuration//
const {
  account_registered,
  change_username,
  change_userHobi,
  change_des,
  user_get,
  get_userList,
  search_userList,
  add_langganan,
  remove_langganan,
  search_langganan, 
  search_pelanggan,
} = require(process.env.user_server);
const {
  post_qoutes,
  delete_product,
  update_qoutes,
  qoutes_get,
  get_userProductList,
  get_searchUserProduct,
  get_productNav,
  qoutes_list_in
} = require(process.env.qoutes_server);

const {
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
   delete_chat
} = require(process.env.chat_coment_server)

const {
  get_callingProcess,
  call_accept_open,
  call_cancelled,
   mic_setting,
  end_call,
  rejecting_processing,
   calling_rejected
}=require(process.env.CALL_SERVER)

//open-app//
http.get("/leo.com", function (input, output) {
  output.render("login-page", {
    page: "login-form",
  });
});
//login and registered//
http.get("/login-page-open", function (input, output) {
  output.render("login-page", {
    page: "login-form",
  });
});

http.get("/register-page", function (input, output) {
  output.render("login-page", {
    page: "regist-form",
  });
});

http.post("/create-account", function (input, output) {
  const data ={
      input:input.body,
      email_exits:users.some((user)=>user.email === input.body.email_input)
  }
  if(data.email_exits==false){
     account_registered(data.input)
    output.redirect('/login-page-open')
  }
  else if(data.email_exits==true){
    output.render('login-page',{
      page:'register-error',
      error_messeage:`mohon maaf email ${data.input.email_input} sudah terdaftar`,
      input:data.input.email_input
    })
  }
 
});

http.post('/get-account-data',function(input,output){
  const data_get=input.body
  const email_check={
       exits:users.some((user)=>user.email ===data_get.email_input),
       data:user_get(data_get.email_input)[0]
  }
  if(email_check.exits==false){
      output.render('login-page',{
      page:'validation-login-error',
       error_messeage:'email belum terdaftar',
       input:data_get.email_input
       

      })
    
  }

  else if(data_get.password_input != email_check.data.password){
    output.render('login-page',{
      page:'validation-login-error',
      error_messeage:'password salah',
      input:data_get.password_input
    })
  }
  else{
    output.redirect(`/product-navigation/${email_check.data.email}`)
  }

})


http.get("/setting-user-data/:user", function (input, output) {
  output.render("user-page", {
    page: "setting-page",
    user: user_get(input.params.user)[0],
  });
});
http.post("/username-change", function (input, output) {
  const user = input.body;
  change_username(user);
  output.redirect(`/setting-user-data/${user.email_input}`);
});
http.post('/change-user-hobi',function(input,output){
  change_userHobi(input.body)
  output.redirect(`/setting-user-data/${input.body.user_email}`)
})

http.post("/edit-description", function (input, output) {
  const user = input.body;
  change_des(users, user, url);
  output.redirect(`/setting-user-data/${user.email}`);
});

//user page//

http.get("/first-page/:user_address", function (input, output) {
  output.render("user-page", {
    page: "user-product-list",
    text_search: "",
    user: user_get(input.params.user_address)[0],
    user_product:get_userProductList(input.params.user_address),
  });
});

http.post("/search-user-product", function (input, output) {
  const product_user = get_userProductList(input.body.user_email);
  output.render("user-page", {
    page: "user-product-list",
    text_search: input.body.search_input,
    user: user_get(input.body.user_email)[0],
    user_product: get_searchUserProduct(product_user, input.body.search_input),
  });
});
http.get("/get-langganan/:user/:market", function (input, output) {
  add_langganan(input.params);
  output.redirect(`/open-navigation/${input.params.user}/${input.params.market}`);
});

http.get('/delete-langganan-user/:user/:target',function(input,output){
  remove_langganan(input.params)
  output.redirect(`/user-langganan/${input.params.user}`)
})


http.get("/user-langganan/:user", function (input, output) {
  const user = user_get(input.params.user)[0];
  output.render("user-page", {
    page: "langganan",
    user,
    langganan: user.langganan,
    text_search: "",
  });
});
http.post("/search-langganan", function (input, output) {
  const user = user_get(input.body.user_email)[0];
  output.render("user-page", {
    page: "langganan",
    user,
    langganan: search_langganan(user.langganan,input.body.search_input),
    text_search: input.body.search_input,
  });
});

http.get("/user-pelanggan/:user", function (input, output) {
  const user = user_get(input.params.user)[0];
  output.render("user-page", {
    page: "pelanggan",
    user,
    pelanggan: user.pelanggan,
    text_search: "",
  });
});
http.post("/search-pelanggan", function (input, output) {
  const user = user_get(input.body.user_email)[0];
  output.render("user-page", {
    page: "pelanggan",
    user,
    pelanggan: search_pelanggan(user.pelanggan, input.body.search_input),
    text_search: input.body.search_input,
  });
});

http.get('/get-my-friend-list/:user',function(input,output){
  const user=user_get(input.params.user)[0]
  output.render('user-page',{
    page:'friends-list',user,
    pelanggan:user.pelanggan,
    langganan:user.langganan,
    friends_length:Number(user.pelanggan.length)+Number(user.langganan.length),
    search_text:""
  })  

})

http.post('/search-friends-list',function(input,output){
  const user=user_get(input.body.user_email)[0]
  output.render('user-page',{
    page:'friends-list',user,
    langganan:search_langganan(user.langganan,input.body.search_input),
    pelanggan:search_pelanggan(user.pelanggan,input.body.search_input),
    search_text:input.body.search_input,
     friends_length:Number(search_langganan(user.langganan,input.body.search_input).length)+Number(search_pelanggan(user.pelanggan,input.body.search_input).length),

  })
})

//product-user//
http.get("/create-new-product/:email", function (input, output) {
  output.render("product-create", {
    page: "product-create-page",
    user: user_get(input.params.email)[0],
  });
});
http.get("/qoutes-delete/:qoutes", function (input, output) {
  const qoutes=qoutes_get(input.params.qoutes)[0]
  const user= user_get(qoutes.qoutes_email)[0]
  delete_product(qoutes.qoutes_id);
  output.redirect(`/first-page/${user.email}`);
});



http.post("/post-qoutes", function (input, output) {
  post_qoutes(input.body,'qoutes','none');
  output.redirect(`/first-page/${input.body.email}`)
   

});

http.get('/open-qoutes-user/:qoutes',function(input,output){
  const qoutes=qoutes_get(input.params.qoutes)[0]
  output.render('product-open',{
    page:'qoutes-user-page',qoutes,
    title:"qoutes-user-body",
    coment_list:get_coments(qoutes.qoutes_id),
    user:user_get(qoutes.qoutes_email)[0]
    
  })
})



http.get('/qoutes-update-open/:qoutes',function(input,output){
  const qoutes=qoutes_get(input.params.qoutes)[0]
  output.render('product-create',{
    page:'qoutes-user-update',qoutes,
    user:user_get(qoutes.qoutes_email)[0], 

  })
})


http.post("/update-qoutes/:qoutes", function (input, output) {
  const update =input.body;
  update_qoutes(update,input.params.qoutes);
  output.redirect(`/first-page/${update.email}`);
});

http.get("/qoutes-open/:user/:qoutes", function (input, output) {
  const qoutes=qoutes_get(input.params.qoutes)[0]
  output.render("product-open", {
    page: "qoutes-open",
    title:'qoutes-body',qoutes,
    user: user_get(input.params.user)[0],
    user_qoutes:user_get(qoutes.qoutes_email)[0],
    coment_list:get_coments(qoutes.qoutes_id)
  });
});
http.get('/qoutes-private-coment/:user/:qoutes',function(input,output){
  output.render('product-open',{
    page:'qoutes-open',
    title:'qoutes-private-coment',
    user:user_get(input.params.user)[0],
    qoutes:qoutes_get(input.params.qoutes)[0],
    user_qoutes:user_get(qoutes_get(input.params.qoutes)[0].qoutes_email)[0]
  })
})


http.post('/send-chat-qoutes',function(input,output){
 create_newChat(input.body,'qoutes-coment-private',input.body.qoutes_id)
  output.redirect(`/get-chat-list/${input.body.user_email}`)

})

http.get('/open-chat/:user/:room/:qoutes',function(input,output){
  const chat=get_chat(input.params.room)[0]
  const qoutes=qoutes_get(input.params.qoutes)[0]
  if(chat.user.address==input.params.user){
    output.render('product-open',{
      page:'qoutes-open',
      title:'qoutes-chat-body',
      chat,qoutes,
      user:user_get(input.params.user)[0],
      reciepent:user_get(chat.reciepent.address)[0],
      user_qoutes:user_get(qoutes.qoutes_email)[0],
      chat_list:get_chatList(input.params.room)
    })
   
  }
  else {
    output.render('product-open',{
      page:'qoutes-open',
      title:'qoutes-chat-body',
      chat,qoutes,
      user:user_get(input.params.user)[0],
      reciepent:user_get(chat.user.address)[0],
      user_qoutes:user_get(qoutes.qoutes_email)[0],
      chat_list:get_chatList(input.params.room)
    })
  }
})







http.get('/qoutes-public-coment/:user/:qoutes',function(input,output){
  output.render('product-open',{
    page:'qoutes-open',
    title:'qoutes-public-coment',
    user:user_get(input.params.user)[0],
    qoutes:qoutes_get(input.params.qoutes)[0],
    user_qoutes:user_get(qoutes_get(input.params.qoutes).qoutes_email)[0]
  
  })
})



http.get('/qoutes-navigation-in/:user/:qoutes',function(input,output){
 output.render('product-open',{
 page:'qoutes-open',
 title:'qoutes-nav-in',
 user:user_get(input.params.user)[0],
 qoutes:qoutes_get(input.params.qoutes)[0],
 qoutes_list:qoutes_list_in(input.params)


 })
})

http.post('/share-qoutes-public',function(input,output){
post_qoutes(input.body,'qoutes-coment-share',input.body.qoutes_id)
output.redirect(`/first-page/${input.body.email}`)
})

http.get('/open-qoutes-user-share/:qoutes',function(input,output){
  const qoutes=qoutes_get(input.params.qoutes)[0]
  output.render('product-open',{
    page:'qoutes-share-user',
    user:user_get(qoutes.qoutes_email)[0],
    qoutes_share:qoutes_get(qoutes.information.qoutes_id)[0], 
    user_qoutes:user_get(qoutes_get(qoutes.information.qoutes_id)[0].qoutes_email)[0],
    coment_list:get_coments(qoutes.qoutes_id),qoutes
  })
})


http.get('/qoutes-share-open/:user/:qoutes',function(input,output){
  const qoutes=qoutes_get(input.params.qoutes)[0]
  const qoutes_share=qoutes_get(qoutes.information.qoutes_id)[0]
  output.render('product-open',{
    page:'qoutes-open-share',
    user:user_get(input.params.user)[0],qoutes,
    qoutes_share:qoutes_get(qoutes.information.qoutes_id)[0],
    user_qoutes:user_get(qoutes.qoutes_email)[0],
    user_qoutes_share:user_get(qoutes_share.qoutes_email)[0],
    coment_list:get_coments(qoutes.qoutes_id)
  })
})




//navigation  page//

http.get("/product-navigation/:user", function (input, output) {
  output.render("navigation-page", {
    page: "qoutes-list",
    product_data: get_productNav(input.params.user),
    user: user_get(input.params.user)[0],
    search_text: "",
  });
});



http.post('/search-qoutes-list',function(input,output){
  const qoutes_list=get_productNav(input.body.user_email)
  output.render('navigation-page',{
    page:'qoutes-list',
    user:user_get(input.body.user_email)[0],
    search_text:input.body.search_input,
    product_data:get_searchUserProduct(qoutes_list,input.body.search_input)
  })
})


http.get("/others-user/:user", function (input, output) {
  output.render("navigation-page", {
    page: "user-nav",
    user: user_get(input.params.user)[0],
    user_data: get_userList(input.params.user),
    search_text: "",
  });
});
http.post("/search-user-list", function (input, output) {
  const user_list = get_userList(input.body.user_email);
  output.render("navigation-page", {
    page: "user-nav",
    user: user_get(input.body.user_email)[0],
    user_data: search_userList(user_list, input.body.search_input),
    search_text: input.body.search_input,
  });
});

http.get("/open-navigation/:user/:market", function (input, output) {
  const user = user_get(input.params.user)[0];
  const check = user.langganan.some(
    (user) => user.email === input.params.market
  );
  if (check == true) {
    output.render("navigation-page", {
      page: "market-navigation",
      status: "langganan",user,
      user_data: user_get(input.params.market)[0],
      market_qoutes: get_userProductList(input.params.market),
    });
  } else {
    output.render("navigation-page", {
      page: "market-navigation",
      status: "no-langganan",user,
      user_data: user_get(input.params.market)[0],
      market_qoutes: get_userProductList(input.params.market),
    });
  }
});




//coment-data//




http.post('/post-coment',function(input,output){
  const qoutes=qoutes_get(input.body.qoutes_id)[0]
  const data=input.body
  post_coment(data)  
 if(qoutes.information.qoutes_type=='qoutes'){
  output.redirect(`/open-qoutes-user/${data.qoutes_id}`)
 }
 else{
  output.redirect(`/open-qoutes-user-share/${qoutes.qoutes_id}`)
 }
})


http.post('/post-coment-data',function(input,output){
  const qoutes=qoutes_get(input.body.qoutes_id)[0]
  const data=input.body
  post_coment(data)
 if(qoutes.information.qoutes_type=='qoutes'){
  output.redirect(`/qoutes-open/${data.user_email}/${data.qoutes_id}`)

 }
 else{
  output.redirect(`/qoutes-share-open/${data.user_email}/${data.qoutes_id}`)
 }



})

//call//
http.get('/get-new-call/:user/:reciepent',function(input,output){
  const data={
     user:user_get(input.params.user)[0],
     reciepent:user_get(input.params.reciepent)[0]
  }
  get_callingProcess(data)
 output.redirect(`/get-call-page/${data.user.email}/${data.reciepent.email}`)
})

http.get('/get-call-page/:user/:reciepent',function(input,output){
  const data={
      user:user_get(input.params.user)[0],
     reciepent:user_get(input.params.reciepent)[0]
  }
 if(data.user.calls==''){
    output.redirect(`/first-page/${data.user.email}`)
 }
 else {
   if(data.user.calls.status=='calling-processing'){
    output.render('call-page',{
      page:'calling-processing',data
     
    })
  }
  else if(data.user.calls.status=='calling-running'){
  output.render('call-page',{
    page:'calling-running',data
  })
  }
 }
  
})
http.get('/call-canceled/:user/:reciepent',function(input,output){
  const data={
      user:user_get(input.params.user)[0],
     reciepent:user_get(input.params.reciepent)[0]
  }
  
  call_cancelled(data)
 output.redirect(`/first-page/${data.user.email}`)
})

http.get('/call-rejected/:user',function(input,output){
  const user=user_get(input.params.user)[0]
  rejecting_processing(user)
  output.redirect(`/first-page/${user.email}`)

})

http.get('/call-accept/:user/:calling',function(input,output){
  const data={
      user:user_get(input.params.user)[0],
     calling:user_get(input.params.calling)[0]
  }
  call_accept_open(data)
 output.redirect(`/get-call-page/${data.user.email}/${data.calling.email}`)
  
})
http.get('/mic-setting/:user/:reciepent/:setting',function(input,output){
 const data={
    user:user_get(input.params.user)[0],
    reciepent:user_get(input.params.reciepent)[0]
 }
  mic_setting(data.user,input.params.setting)
  output.redirect(`/get-call-page/${data.user.email}/${data.reciepent.email}`)
})

http.get('/call-end/:user/:others',function(input,output){
  const data={
      user:user_get(input.params.user)[0],
      reciepent:user_get(input.params.others)[0]
  }  
  end_call(data);
  
output.redirect(`/first-page/${data.user.email}`)


})


http.post('/rejected-calls',function(input,output){
  const data={
     user:user_get(input.body.user_email)[0],
     calling:user_get(input.body.calling_email)[0]
  }
 calling_rejected(data,input.body)

 output.redirect(`/first-page/${data.user.email}`)
})



//chat//
http.get('/get-chat-open/:user',function(input,output){
  const user=user_get(input.params.user)[0]
  output.render('chat-page',{
    page:'chat-list-open',user,
    langganan:user.langganan,
    pelanggan:user.pelanggan,
    search_text:""
  })
})
http.post('/search-friends',function(input,output){
  const user=user_get(input.body.user_email)[0]
  output.render('chat-page',{
    page:'chat-list-open',user,
    search_text:input.body.search_input,
    langganan:search_langganan(user.langganan, input.body.search_input),
    pelanggan:search_pelanggan(user.pelanggan, input.body.search_input),
    friends_length:Number(search_langganan(user.langganan,input.body.search_input).length)+Number(search_pelanggan(user.pelanggan,input.body.search_input).length)
  })
})


http.get('/get-new-chat/:user/:reciepent',function(input,output){
  output.render('chat-page',{
    page:'chat-new-page',
    user:user_get(input.params.user)[0],
    reciepent:user_get(input.params.reciepent)[0]
  })
})

http.post(`/create-new-chat`,function(input,output){
  const chat_input=input.body
  create_newChat(chat_input,'chat-text','none')
  output.redirect(`/get-chat-list/${chat_input.user_email}`)
})

http.get('/get-chat-list/:user',function(input,output){
  output.render('chat-page',{
    page:'chat-list',
    search_text:"",
    user:user_get(input.params.user)[0],
    chat:{
      send:get_chatSend(input.params.user),
      accept:get_chatReciepent(input.params.user)
    }
  })
})
http.post('/search-chat-list',function(input,output){
  const chat={
    send:get_chatSend(input.body.user_email),
    accept:get_chatReciepent(input.body.user_email)
  }
  output.render('chat-page',{
    page:'chat-list',
    search_text:input.body.search_input,
    user:user_get(input.body.user_email)[0],
    chat:{
      send:search_chatSend(chat.send,input.body.search_input),
      accept:search_chatAccept(chat.accept,input.body.search_input)
    }
  })
})

http.get('/chat-send-list/:user',function(input,output){
  output.render('chat-page',{
    page:'chat-send-list',
    search_text:'',
    user:user_get(input.params.user)[0],
    chat:get_chatSend(input.params.user)
  })
})

http.post('/search-chat-send',function(input,output){
  const chat_send=get_chatSend(input.body.user_email)
  output.render('chat-page',{
    page:'chat-send-list',
    search_text:input.body.search_input,
    user:user_get(input.body.user_email)[0],
    chat:search_chatSend(chat_send,input.body.search_input)
  })
})

http.get('/chat-accept-list/:user',function(input,output){
  output.render('chat-page',{
    page:'chat-accept-list',
    search_text:"",
    user:user_get(input.params.user)[0],
    chat_accept:get_chatReciepent(input.params.user)
  })
})
http.post('/search-chat-accept',function(input,output){
  const chat_acc=get_chatReciepent(input.body.user_email)
  output.render('chat-page',{
    page:'chat-accept-list',
    search_text:input.body.search_input,
    user:user_get(input.body.user_email)[0],
    chat_accept:search_chatAccept(chat_acc,input.body.search_input)
  })
})

http.get('/open-chat/:user/:room',function(input,output){
  const chat=get_chat(input.params.room)[0]
  if(chat.user.address==input.params.user){
    output.render('chat-page',{
      page:'chat-open',chat,
      user:user_get(input.params.user)[0],
      reciepent:user_get(chat.reciepent.address)[0],
      chat_list:get_chatList(input.params.room)

      
    })
  }
  else{
       output.render('chat-page',{
        page:'chat-open',chat,
        user:user_get(input.params.user)[0],
        reciepent:user_get(chat.user.address)[0],
        chat_list:get_chatList(input.params.room)
  
       })
  }
})



http.post('/send-chat',function(input,output){
  const get_data=input.body
  const chat=get_chat(get_data.room)[0]
  send_chat(get_data)
  if(chat.information.type=='chat-text'){
    output.redirect(`/open-chat/${get_data.user_email}/${get_data.room}`)
  }
  else if(chat.information.type=='call-record'){
     output.redirect(`/open-chat/${get_data.user_email}/${get_data.room}`)
  }
  else{
    output.redirect(`/open-chat/${get_data.user_email}/${get_data.room}/${get_data.qoutes_id}`)
  }
})

http.get('/delete-chat/:user/:room',function(input,output){
  delete_chat(input.params)
  output.redirect(`/get-chat-list/${input.params.user}`)
})


http.listen(port, function () {
  console.log("berhasil terkoneksi dengan:localhost:" + port);
})
