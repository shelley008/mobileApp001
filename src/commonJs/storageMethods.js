import Vue from 'vue'
var UserData = {
  save(obj,keyName){
    var storage=window.localStorage;
    //写入a字段
    //storage.a = JSON.stringify(obj);
    //写入b字段
    //storage['b'] = JSON.stringify(obj);
    //写入c字段
    storage.setItem(keyName,JSON.stringify(obj));
  },
  get(keyName){
     return JSON.parse(window.localStorage.getItem(keyName))
  },
  clear(){
    localStorage.clear()
  },
  remove(keyName){
    localStorage.removeItem(keyName)
  }
};


export default UserData

//
// export function alertfn(){
//   console.log('-------alert')
// }



//挂载缓存方法  其他页面引用 this.UserData.save
//Vue.prototype.UserData = UserData;


// var Users = {
//   username:'huahua',
//   password:123456
// };

// (function(){
//   SetUserData.save(Users)
// })();


