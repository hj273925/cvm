import Vue from 'vue'
import Router from 'vue-router'
import CdnList from '@/components/CdnList'
import CdnEdit from '@/components/CdnEdit'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'CdnList',
    component: CdnList
  }, {
    path: '/cdnedit/:id',
    name: 'CdnEdit',
    component: CdnEdit
  }]
})
