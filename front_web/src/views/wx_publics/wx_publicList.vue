<<template>
  <div>

    <!-- 页面顶部 搜索框和查询按钮
    <Row>
      <Col :xs="17" :sm="19" :md="20" :lg="20">
        <Input v-model = "queryData" placeholder = "请输入查询内容" clearable style = "width: 40%; margin-right: 10px;"></Input>
        <Button type ="primary" icon = "ios-search" @click = "query">查询</Button>
      </Col>
    </Row> -->

    <!-- 表格 -->
    <Table 
      :data = 'wx_publics' 
      :columns = 'wx_public_columns' 
      stripe 
      border>
    </Table>

    <!-- 分页 -->
    <Page 
        :page-size = "25"
        :total = "total_count" 
        :current = "current_page" 
        @on-change = "backPageData" 
        show-elevator 
        show-total
        style = "text-align: right; margin-top: 20px;">
    </Page>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        //定义
        //queryData: '',
        wx_publics: [],
        total_count: 0,
        current_page: 1,
        wx_public_columns: [
          {
            title: '公众号名称',
            key: 'name',
            align: 'center'
          },
           {
            title: '公众号描述',
            key: 'desc',
            align: 'center'
          },
           {
            title: '是否开启采集',
            key: 'active',
            align: 'center',
            render: (h,params) => {
              return h('div', params.row.active ? '开启' : '关闭')
            }
          },
           {
            title: '公众号文章默认采集条数',
            key: 'collect_count',
            align: 'center'
          },
           {
            title: '文章监控频率',
            key: 'monitoring_rate',
            align: 'center'
          },
           {
            title: '监控次数',
            key: 'monitoring_count',
            align: 'center',
            sortable: true
          },
           {
            title: '监控结束日期',
            key: 'end_at',
            align: 'center'
          },
           {
            title: '创建时间',
            key: 'create_at',
            align: 'center'
          },
        ]
      }
    },
    created () {
      //this.query ();
      this.axios.get('/wx_publics/' + this.$route.params.id).then((res) => {
        this.wx_publics = res.data.wx_publics
      })
    },
    methods: {
      //分页
      backPageData (page) {
        this.axios.get('/wx_publics?page=' + page + '&active=' + this.active).then((result) => {
          this.wx_publics = res.data.wx_publics
          this.total_count = res.data.total_count
          this.current_page = res.data.current_page
        })
      }
    }
  }
</script>

<style scoped>
  
</style>