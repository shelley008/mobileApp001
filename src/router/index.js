import Vue from 'vue'
import Router from 'vue-router'
import navigation from '@/components/navigation'
import Word from '@/components/word'
import Bank from '@/components/account/myBank'
import addNewCharge from '@/components/account/addNewCharge'
import Note from '@/components/notepad/note'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: navigation
    },
    {
      path:'/word',
      name:'word',
      component:Word
    },
    {
      path:'/Bank',
      name:'Bank',
      component:Bank
    },
    {
      path:'/addNewCharge',
      name:'addNewCharge',
      component:addNewCharge
    },
    {
      path:'/Note',
      name:'Note',
      component:Note
    }
  ]
})
