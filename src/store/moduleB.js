import {ADD_NOTES,DELETE_NOTES} from './storeTypes'

import UserData from '../commonJs/storageMethods'

export default {
    state:{
        bt:'huhua001',
        noteDatas:[
          {title:'huahua我的记事本-1',description:'今天是周一，晚上下班有雨'}
        ]
    },
    mutations:{
      //添加记录
      [ADD_NOTES](state,data){
        //this.noteData.unshift(data)
        state.noteDatas.unshift(data)

        //设置唯一的ID
        let d = new Date()
        let id = d.getTime() //


        //保存到缓存中
        let storageFileName = 'noteNews'
        UserData.save(state.noteDatas,storageFileName)

        //从缓存中取数据
        console.log('add*****', UserData.get(storageFileName))
      },
      //删除记录
      [DELETE_NOTES](state,index){
        //this.noteData.splice(index,1)
        state.noteDatas.splice(index,1)
      }
    },
    actions:{},
    getters:{}
}
