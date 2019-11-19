import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/pages/index'
import login from '../components/pages/login'

import manage from '../components/pages/manage'
import manageList from '../components/pages/manageList'
import manageCreate from '../components/pages/manageCreate'

import user from '../components/pages/user'
import userList from '../components/pages/userList'
import userCreate from '../components/pages/userCreate'

import news from '../components/pages/news'
import newsList from '../components/pages/newsList'
import newsCreate from '../components/pages/newsCreate'

import device from '../components/pages/device'
import deviceList from '../components/pages/deviceList'
import deviceCreate from '../components/pages/deviceCreate'

import welcome from '../components/pages/welcome'


Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path:'/index',
      component:index,
      children:[
        {
          path:'',
          component:welcome
        },
        {
          path:'news',
          component:news,
          children:[
            {
              path:'',
              component:newsList,
              name:'通知列表'
            },
            {
              path:'create',
              component:newsCreate,
              name:'添加/修改通知'
            }
          ]
        },
        {
          path:'manage',
          component:manage,
          children:[
            {
              path:'',
              component:manageList,
              name:'管理员列表页'
            },
            {
              path:'create',
              component:manageCreate,
              name:'添加/修改管理员'
            }
          ]
        },
        {
          path:'user',
          component:user,
          name:'用户列表页',
          children:[
            {
              path:'',
              component:userList,
              name:'用户列表'
            },
            {
              path:'create',
              component:userCreate,
              name:'添加/修改用户'
            }
          ]
        },
        {
          path:'device',
          component:device,
          children:[
            {
              path:'',
              component:deviceList,
              name:'设备列表页'
            },
            {
              path:'create',
              component:deviceCreate,
              name:'添加/修改设备'
            }
          ]
        }
      ]
    },
    {
      path:'/login',
      component:login
    },
    {
      path:'*',
      redirect:'/login'
    }
  ]
})
