const routers = [
{
    path: '/',
    meta: {
        title: ''
    },
    component: (resolve) => require(['./views/index.vue'], resolve)
},
{
    path: '/home',
    meta: {
        title: ''
    },
    component: (resolve) => require(['./views/home.vue'], resolve)
},
{
    path: '/wx_publics',
    meta: {
        title: ''
    },
    component: (resolve) => require(['./views/wx_publics/wx_publicList.vue'], resolve)
}
];
export default routers;