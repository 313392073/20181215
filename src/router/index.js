import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Reg from '@/components/Reg'
import Transition from '@/components/Transition'
import Show from '@/components/Show'
import Echart from '@/components/Echart'
import Echart2 from '@/components/Echart2'
import Echart3 from '@/components/Echart3'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/reg',
      name: 'Reg',
      component: Reg
    },
    {
      path: '/test',
      name: 'Transition',
      component: Transition
    },
    {
      path: '/show',
      name: 'Show',
      component: Show
    },
    {
      path: '/echart',
      name: 'Echart',
      component: Echart
    },
    {
      path: '/echart2',
      name: 'Echart2',
      component: Echart2
    },
    {
      path: '/echart3',
      name: 'Echart3',
      component: Echart3
    }
  ]
})
