import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Vuex from 'vuex';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import axios from 'axios';
//import filters from './filter';


Vue.use(VueRouter);
Vue.use(Vuex);

Vue.use(iView);

// 配置使用 axios
Vue.prototype.axios = axios;
axios.defaults.baseURL = 'http://mock.eolinker.com/nACZUSt4834418d16e8ab723bda42503877e0658919acba?uri=/admin';
Vue.config.productionTip = false;
//Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));


// 路由配置
const RouterConfig = {
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


const store = new Vuex.Store({
    state: {

    },
    getters: {

    },
    mutations: {

    },
    actions: {

    }
});


new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});