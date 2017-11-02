import Vue from 'vue'
import Router from 'vue-router'
import CvmList from '@/components/CvmList'
import CvmCreate from '@/components/CvmCreate'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'CvmList',
    component: CvmList
  }, {
    path: '/cvmcreate/:id',
    name: 'CvmCreate',
    component: CvmCreate
  }]
})
