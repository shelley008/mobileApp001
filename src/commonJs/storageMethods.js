import Vue from 'vue'
var UserData = {
  save(obj,files){
    var storage=window.localStorage;
    //写入a字段
    //storage.a = JSON.stringify(obj);
    //写入b字段
    //storage['b'] = JSON.stringify(obj);
    //写入c字段
    storage.setItem(files,JSON.stringify(obj));
  },
  get(files){
     return JSON.parse(localStorage.getItem(files))
  },
  clear(){
    localStorage.clear()
  },
  remove(){
    localStorage.removeItem('noteDatas')
  }
};

//挂载缓存方法  其他页面引用 this.UserData.save
//Vue.prototype.UserData = UserData;

export default UserData

//
// export function alertfn(){
//   console.log('-------alert')
// }







// var Users = {
//   username:'huahua',
//   password:123456
// };

// (function(){
//   SetUserData.save(Users)
// })();


