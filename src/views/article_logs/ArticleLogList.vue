<template>
  <div>
    <Row>
       <Col 
       :xs="17" :sm="19" :md="20" :lg="20">
        <Input clearable placeholder="输入搜索内容" style="width: 40%; margin-right: 10px;" v-model="search"></Input>
        <Button type="primary" icon="ios-search" @click="getArticleLogs(1)">搜索</Button>
      </Col>
    </Row>
    <!-- 表格数据 -->
    <Table 
        class="table"
        :columns="columns" 
        :data="article_logs" 
        :stripe="true" 
        border>
    </Table> 
    <!-- 分页栏 -->
    <Page 
        :page-size = "25" 
        :total = "total" 
        :current = "current_page" 
        @on-change = "getArticleLogs" 
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
      //定义
      search: '',
      wx_public_id: null,
      article_id: null,
      article_logs:[],
      total: null,
      current_page: null,
      columns: [
        {
          title: '文章标题',
          key: 'title',
          align: 'center'
        },
        {
          title: '新增浏览数',
          key: 'new_view_count',
          align: 'center',
          sortable: true
        },
        {
          title: '当期数据日期',
          key: 'ref_date',
          align: 'center'
        },
        {
          title: '总浏览数',
          key: 'view_count',
          align: 'center',
          sortable: true
        },
        {
          title: '记录创建时间',
          key: 'created_at',
          align: 'center'
        }
      ]
    }
  },
  created () {
    this.getArticleLogs(1)
    this.wx_public_id = this.$route.params.wx_public_id
    this.article_id = this.$route.params.article_id
  },
  // computed: {
  //   filtedData () {
  //       return this.data.filter((item) => {
  //           let reg = new RegExp(this.query, 'i')
  //           return !this.query || reg.test(item.title)
  //     })
  //   }    
  // },
  methods: {
    getArticleLogs (page) {
      this.axios.get(`/wx_publics/${this.wx_public_id}/articles/${this.article_id}/article_logs?page=${page}&search=${this.search}`).then((res) => {
          console.log(res.data)
        this.article_logs = res.data.article_logs
        this.total = res.data.total
        this.current_page = res.data.current_page
        })
    },

  }
}
</script>

<style scoped>
  
</style>

