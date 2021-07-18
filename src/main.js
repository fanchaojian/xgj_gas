//导入jquery和bootstrap
import $ from 'jquery'
import 'bootstrap'
import Vue from 'vue'
import App from './App'
import router from './router'
import {request} from './utils/webRequest'
import {request_SF} from './utils/webRequest_SF'
import store from './store/index'
import axios from 'axios'
import "./utils/array"
import "./utils/control"
import "./utils/date"
import "./utils/elements"
import "./utils/number"
import "./utils/string"
import "./utils/touch"

//element-UI
import {Notification,Loading } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Notification.duration = 1000 ; 
Vue.prototype.$notify = Notification;
Vue.use(Loading) ; 

//处理时间
import moment from 'moment'


//MintUI
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

Vue.prototype.$moment = moment;
Vue.prototype.$request = request ; 
Vue.prototype.$request_SF = request_SF ; 

Vue.prototype.$store = store ; 

Vue.prototype.$axios = axios  ; 
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})


