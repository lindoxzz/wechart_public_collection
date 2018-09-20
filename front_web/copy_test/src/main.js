import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Vuex from 'vuex';
import Util from './libs/util';
import App from './app.vue';
//import 'iview/dist/styles/iview.css';
import axios from 'axios';
import store from './store';

// 全局变量
import 'iview/dist/styles/iview.css';
import '../config/globalUrl.js'
import './styles/media.css'

Vue.use(VueRouter);
Vue.use(Vuex);

Vue.use(iView);

Vue.config.productionTip = false;
 Vue.prototype.axios = axios

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});


// const store = new Vuex.Store({
//     state: {

//     },
//     getters: {

//     },
//     mutations: {

//     },
//     actions: {

//     }
// });
let env = process.env.NODE_ENV
let authorization = window.localStorage.getItem('authorization')

 let user = window.localStorage.getItem('user')
let manager = window.localStorage.getItem('manager')

 if (authorization !== null && env === 'production') {
  axios.defaults.headers.common['Authorization'] = authorization
}
 if (user !== null) {
  store.commit('SET_USER', { user: JSON.parse(user) })

if (manager !== null) {
  store.commit('SET_MANAGER', { manager: JSON.parse(manager) })
}

 if (env === 'production') {
  axios.defaults.baseURL = 'http://c.00603.top/api/v1/admin'
} else {
  axios.defaults.baseURL = 'http://collect.lindo.io/api/v1/admin'
  axios.defaults.baseURL = 'http://multi_kdb.lindo.io/api/v2/admin'
  // axios.defaults.baseURL = 'http://c.00603.top/api/v1/admin'
}

if (authorization === null) {
    store.dispatch('loadUser').then(() => {
    store.dispatch('loadManager').then(() => {
      /* eslint-disable no-new */
      new Vue({
        el: '#app',
         router,
         store,
         render: h => h(App)
       })
     })
})
}else {
     /* eslint-disable no-new */
     new Vue({
       el: '#app',
       router,
       store,
       render: h => h(App)
     })
}
