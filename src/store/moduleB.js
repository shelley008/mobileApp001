import {ADD_NOTES,DELETE_NOTES,GET_NOTES,EDIT_NOTES} from './storeTypes'

import UserData from '../commonJs/storageMethods'

export default {
    state:{
        msgSt:'huhua001',
        noteDatas:[
          {title:'huahua我的记事本-1',description:'今天是周一，晚上下班有雨'}
        ],
        keyName:'noteNews'
    },
    mutations:{

      //添加记录
      [ADD_NOTES](state,data){
        console.log('新记录*****')
        state.noteDatas.unshift(data)
        //保存到缓存中
        UserData.save(state.noteDatas,state.keyName)
        //console.log('add*****', UserData.get(state.keyName))

      },

      //删除记录
      [DELETE_NOTES](state,index){
        //this.noteData.splice(index,1)
        state.noteDatas.splice(index,1)
        UserData.save(state.noteDatas,state.keyName)
      },


      //编辑记录
      [EDIT_NOTES](state,data){
        console.log('编辑记录2*****')

        //从缓存查找是不是修改的对象
        let storeOld = UserData.get(state.keyName)
        console.log('new:---',data)
        console.log('old:---',storeOld)

        if(storeOld.length > 0){
          storeOld.forEach((item,index)=>{
            if(Number(item.timeId) == Number(data.timeId)){
              state.noteDatas.splice(index,1,data)
            }
          })
          UserData.save(state.noteDatas,state.keyName)
        }

        console.log('set-',state.noteDatas)
      }


    },

    actions:{},

    getters:{
       //从缓存中取出数据
       [GET_NOTES](state){
         let data = UserData.get(state.keyName)
         if(data){
           state.noteDatas = data
         }
         return state.noteDatas
       }
    }
}
