const routers = [
    {
    path: '/',
    name: 'Home',
    component: (resolve) => require(['./views/Home.vue'], resolve),
        children: [
            //首页
            {
                path: '/index',
                name: 'Index',
                component: (resolve) => require(['./views/index.vue'], resolve),
                meta: {
                    menuName: 'Index',
                    //keepAlive: true
                }
            },
            //文章浏览量日志
            {
                path: '/wx_publics/:wx_public_id/articles/:article_id/article_logs',
                name: 'articleLogList',
                meta: {
                    menuName: '文章浏览量日志',
                    //keepAlive: true
              },
              component: (resolve) => require(['./views/article_logs/ArticleLogList.vue'], resolve)
            },
            //公众号文章
            {
                path: '/wx_publics/:wx_public_id/articles1',
                name: 'articleList',
                meta: {
                    menuName: '公众号文章',
                    //keepAlive: true
                },
                component: (resolve) => require(['./views/articles/ArticleList.vue'], resolve)
            },
            {
                path: '/wx_publics/:wx_public_id/articles1/:id/detail',
                name: 'articleDetail',
                meta: {
                    menuName: '',
                    // keepAlive: true
                },
                component: (resolve) => require(['./views/articles/ArticleDetail.vue'], resolve)
            },
            //设备
            {
                path: '/phones',
                name: 'phoneList',
                meta: {
                    menuName: '设备',
                    //keepAlive: true
                },
                component: (resolve) => require(['./views/phones/PhoneList.vue'], resolve)
            },
            {
                path: '/phones/:id/detail',
                name: 'PhoneDetail',
                meta: {
                    menuName: '设备',
                    //keepAlive: true
                },
                component: (resolve) => require(['./views/phones/PhoneDetail.vue'], resolve)
            },
            //微信公众号
            {
                path: '/wx_publics',
                name: 'wx_publicList',
                meta: {
                    menuName: '微信公众号',
                    //keepAlive: true
                },
                component: (resolve) => require(['./views/wx_publics/wx_publicList.vue'], resolve)
            },
            {
                path: '/wx_publics/new',
                name: 'wx_publicNew',
                meta: {
                    menuName: 'WxPublics',
                    //keepAlive: false
                },
                component: (resolve) => require(['./views/wx_publics/wx_publicNewEdit.vue'], resolve)
            },
            {
                path: '/wx_publics/:id/edit',
                name: 'wx_publicEdit',
                meta: {
                    menuName: 'WxPublics',
                    //keepAlive: false
                },
                component: (resolve) => require(['./views/wx_publics/wx_publicNewEdit.vue'], resolve)
            },
        ]
    }
];
export default routers;

      
