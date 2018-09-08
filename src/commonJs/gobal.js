var SetUserData = {
  save(obj){
    var storage=window.localStorage;
    //写入a字段
    storage.userInfoA = JSON.stringify(obj);
    //写入b字段
    storage.setItem("userInfo",JSON.stringify(obj));
  },
  get(){

  },
  remove(){

  }
};

var Users = {
  username:'shelley008',
  password:123456
};


(function(){
  SetUserData.save(Users)
})();


