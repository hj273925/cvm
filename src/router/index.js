import Vue from 'vue'
import Router from 'vue-router'
import CvmList from '@/components/cvm/CvmList'
import CvmCreate from '@/components/cvm/CvmCreate'
import CdnList from '@/components/cdn/CdnList'
import CdnEdit from '@/components/cdn/CdnEdit'

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
  }, {
    path: '/cdnlist',
    name: 'CdnList',
    component: CdnList
  }, {
    path: '/cdnedit/:id',
    name: 'CdnEdit',
    component: CdnEdit
  }]
})
