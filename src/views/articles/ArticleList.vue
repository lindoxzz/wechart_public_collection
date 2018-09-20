<template>
  <div>
    <Row>
       <Col 
       :xs="17" :sm="19" :md="20" :lg="20">
        <Input clearable placeholder="输入搜索内容" style="width: 40%; margin-right: 10px;" v-model.trim="query"></Input>
        <div class="spec-same" v-for="one in articleList | conditions"></div>
          <Button type="primary" icon="ios-search" @click="getArticles()">搜索</Button>
      </Col>
    </Row>
    <Table 
        class="table"
        :columns="columns" 
        :data="articles" 
        :stripe="true" 
        border>
    </Table>
    <Page 
        :page-size = "25" 
        :total = "total" 
        :current = "current_page" 
        @on-change = "getArticles"
        show-elevator 
        show-total
        style = "text-align: right;margin-top: 20px;">
    </Page>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        columns: [
          {
            title: '文章标题',
            key: 'title',
            align: 'center'
          },
          {
            title: '文章内容',
            key: 'content',
            align: 'center'
          },
          {
            title: '文章链接地址',
            key: 'url',
            align: 'center'
          },
          {
            title: '文章描述',
            key: 'desc',
            align: 'center'
          },
          {
            title: '文章作者',
            key: 'author',
            align: 'center'
          },
          {
            title: '文章当前浏览量',
            key: 'view_count',
            align: 'center',
            sortable: true
          },
          {
            title: '是否开启监控',
            key: 'is_open',
            align: 'center',
            render: (h, params) => {
            return h('div', params.row.is_open ? '开启' : '关闭')
            }
          },
          {
            title: '文章状态',
            key: 'status',
            align: 'center',
            render: (h, params) => {
            switch (params.row.status) {
              case -1:
                return h('div', '监控完成')
              case 0:
                return h('div', '未监控')
              case 1:
                return h('div', '监控中')
            }
          }
          },
          {
            title: '文章发布时间',
            key: 'release_at',
            align: 'center'
          },
          {
            title: '文章创建时间',
            key: 'created_at',
            align: 'center'
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$router.push(`/wx_publics/${this.wx_public_id}/articles1/${params.row.id}/detail`)
                    }
                  }
                }, '详细信息')
              ])
            }
          }
        ],
        articles: [],
        query: '',
        total: null,
        current_page: null,
        wx_public_id: null,
        articleList: null,
        conditions: ''
      }
    },
    created () {
      this.wx_public_id = this.$route.params.wx_public_id
      console.log(this.wx_public_id)
      this.getArticles()
    },
    // computed: {
    //   queryData: function () {
    //     let query = this.query;
    //     if (query) {
    //       return this.articles.filter(function(title) {
    //         return Object.keys(title).some(function(key) {
    //           return String(title[key]).indexOf(query) > -1
    //         })
    //       })
    //     }
    //     return this.articles;
    //   }
    // },

    filters:{
    conditions: function(items){
        let reg = new RegExp(this.query, 'i');
        let arr=[];
        for(let i= 0, j = items.length; i < j; i++){
            arr[i] = {};
            arr[i].contacters = [];
            for(let item = 0, len = items[i].contacters.length; item < len; item++){
                if(reg.test(items[i].contacters[item].title) || reg.test(items[i].contacters[item].author)){
                    arr[i].firstLetter = items[i].firstLetter;
                    arr[i].contacters.push(items[i].contacters[item]);
                }
            }
        }
        return arr;
      }
    },

    methods: {
      //分页功能
      getArticles (page) {
        this.axios.get(`/wx_publics/${this.wx_public_id}/articles1?page=${page}&query=${this.query}`).then((res) => {
        this.articles = res.data.articles
        this.total = res.data.total
        this.current_page = res.data.current_page
        })
      }
      
    }
  }
</script>

<style scoped>
.table {
  margin-top: 20px;
}
</style>
