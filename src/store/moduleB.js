import {ADD_NOTES,DELETE_NOTES} from './storeTypes'

import UserData from '../commonJs/storageMethods'

export default {
    state:{
        bt:'huhua001',
        noteDatas:[
          {title:'huahua我的记事本-1'},
          {title:'huahua我的记事本-2'},
        ]
    },
    mutations:{
      [ADD_NOTES](state,data){
       // this.noteData.unshift(data)
        state.noteDatas.unshift(data);

        //保存到缓存中
        let storageFileName = 'noteNews'
        UserData.save(state.noteDatas,storageFileName)
        //从缓存中取数据

        console.log('add*****', UserData.get(storageFileName))



      },
      [DELETE_NOTES](state,index){
        //this.noteData.splice(index,1)
        state.noteDatas.splice(index,1)
      }
    },
    actions:{},
    getters:{}
}
