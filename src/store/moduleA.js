import {ADD_FLOW,SET_CHARGE_DATAS} from './storeTypes'

export default {
    state:{
       msg:1,

       //所有流水记录
       chargeDatas:[]
    },
    mutations:{
        [ADD_FLOW](state,num){
          state.msg += num + 50
        },
        [SET_CHARGE_DATAS](state,datas){
          console.log('data-------')
          console.log('-datas----',datas)
          console.log('data-------')

         
          let i = {id:0}
          let t = Object.assign({},datas,i)
          state.chargeDatas.push(t)
          state.chargeDatas.forEach((item,index,arr) => {
               arr[index].id = index;
               console.log('-----item---',item)
          })
          console.log('-----state.chargeDatas---',state.chargeDatas)
         
        }
    },
    actions:{

    },
    getters:{
      getStateMsg(state){
          return state.msg
      },
      getNewRecord(state){
          return state.chargeDatas
      }
    }
}


  