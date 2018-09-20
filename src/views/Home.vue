<template>
  <div class= "layout">
    <Layout>
      <Sider ref="side" breakpoint="md" collapsible :collapsed-width="80" v-model="isCollapsed" :style="{minHeight: '100vh'}">
        <button type="primary" @click="goHome('/index')">
          微信公众号采集
        </button>
        <template>
            <Menu theme="dark" :active-name="this.$route.meta.menuName" width="auto" :class="menuitemClasses">
                <Submenu name="1"  >
                    <MenuItem :name="menu.name" v-for="(menu, key) in menus" :key="key" @click.native="onMenu(menu,menu.nickname)">
                        <Icon :type="menu.icon"></Icon>
                          {{menu.name}}
                    </MenuItem>
                </Submenu>
            </Menu>
        </template>
      </Sider>
      <Layout>
        <Header :style="{padding: 0, background: '#fff'}" class="layout-header-bar">
          <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
        </Header>
        <Breadcrumb :style="{margin: '16px 16px 0px 16px'}">
          <Breadcrumb-item @click.native="" >
            <Icon type="ios-home-outline"></Icon> 首页
          </Breadcrumb-item> 
          <Breadcrumb-item v-if="title">
            <Icon type="social-buffer-outline"></Icon> {{title}}
          </Breadcrumb-item>
        </Breadcrumb>
          <Content :style="{margin: '16px', padding: '16px', background: '#fff', minHeight: '650px'}">
            <router-view ></router-view>
          </Content>
      </Layout>
    </Layout>
    <!-- 返回顶部 -->
    <BackTop></BackTop>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isCollapsed: false,
      menus: null,
      title: ''
    }
  },
  methods: {
    onMenu (menu,nickname) {
      this.title = menu.nickname
      this.$router.push(menu.url)
      this.collapsedSider()
    },
    collapsedSider () {
        this.$refs.side.toggleCollapse()
    },
    goHome (path) {
      this.$router.push(path)
    }
  },
  computed: {
      rotateIcon () {
        return [
            'menu-icon',
                this.isCollapsed ? 'rotate-icon' : ''
              ];
          },
      menuitemClasses () {
          return [
              'menu-item',
              this.isCollapsed ? 'collapsed-menu' : ''
              ]
            }
        },
  created () {
    this.menus = [
      {
        id: '1',
        name: '文章浏览量日志',
        nickname: '文章浏览量日志',
        icon: 'ios-book-outline',
        url: '/wx_publics/:wx_public_id/articles/:article_id/article_logs'
      },
      {
        id: '2',
        name: '公众号文章',
        nickname: '公众号文章',
        icon: 'ichatbubble-working',
        url: '/wx_publics/:wx_public_id/articles1'
      },
      {
        id: '3',
        name: '设备',
        nickname: '设备',
        icon: 'ios-archive-outline',
        url: '/phones'
      },
      {
        id: '4',
        name: '微信公众号',
        nickname: '微信公众号',
        icon: 'ios-school-outline',
        url: '/wx_publics'
      }
    ]
  }
}
</script>

<style>
.layout{
  border: 1px solid #d7dde4;
  border-radius: 4px;
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
}
.ivu-layout-header {
  background: #fff;
}
.layout-header-bar{
  background: rgb(5, 197, 63);
  box-shadow: 0 1px 1px rgba(38, 5, 223, 0.1);
}
.layout-logo-left{
  width: 90%;
  height: 30px;
  background: #f8f9fa;
  border-radius: 3px;
  margin: 15px auto;
}
.menu-icon{
  transition: all .3s;
}
.rotate-icon{
  transform: rotate(-90deg);
}
.menu-item span{
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width .2s ease .2s;
}
.menu-item i{
  transform: translateX(0px);
  transition: font-size .2s ease, transform .2s ease;
  vertical-align: middle;
}
.collapsed-menu span{
  width: 0px;
  transition: width .2s ease;
}
.collapsed-menu i{
  transform: translateX(5px);
  transition: font-size .2s ease .2s, transform .2s ease .2s;
  vertical-align: middle;
}
</style>



