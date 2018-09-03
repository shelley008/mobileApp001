import Vue from 'vue'
import Vuex  from 'vuex'
import moduleA from './moduleA'
import moduleB from './moduleB'
import moduleC from './moduleC'

Vue.use(Vuex)


export default new Vuex.Store({
    modules:{
        a:moduleA,
        b:moduleB,
        c:moduleC
    }
})
  




//https://www.jianshu.com/p/c91ee3d59453




// import Vue from 'vue'
// import Vuex from 'vuex'
// import mutations from './mutations'
// import actions from './action'
// import getters from './getters'

// Vue.use(Vuex)
// const state = {
//   count: 0,
//   checkList:[],
//   confDescription:''
// }

// export default new Vuex.Store({
//   state,
//   getters,
//   actions,
//   mutations
// })





