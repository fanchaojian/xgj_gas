import Vue from 'vue'
import Router from 'vue-router'

//公共路由
import starter from '@/views/starter.vue' ; 
import login from '@/views/login.vue'

//导入智能燃气项目的路由
import {xgjgasRoutes} from '@/router/xgjgas/index.js'
//售后运营平台路由
import {ServiceRoutes} from '@/router/ServicePlatform/index.js'


Vue.use(Router)

var routes = [
  {
    path:"/",
    component:starter
  },
  {
    path:"/login",
    component:login
  }
] ; 
routes = routes.concat(xgjgasRoutes,ServiceRoutes) ; 

const vueRouter = new Router({
  routes:routes,
})

//全局导航守卫，前置守卫判断有无登录，localStorage 中有无登录标记userId
/*vueRouter.beforeEach((to,from,next) => {
  var userId = localStorage.getItem("userId") ;
  if(userId == null || userId == 'undefined' || userId == ""){
    if(to.path == "/login"){
      next() ; 
    }else{
      next("/login") ; 
    }
  }else{
    next() ; 
  }
   
}) ;   */

export default vueRouter
