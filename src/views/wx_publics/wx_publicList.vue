<template>
  <div>
    <Row>
      <Col :xs = "{span: 5, offset: 19}" :sm = "{span: 3, offset: 21}" :md = "{span: 2, offset: 22}" :lg = "{span: 2, offset: 22}">
        <Button type = "success" icon = "plus-round" @click = "create">新建</Button>
      </Col>
    </Row>
    <Modal
      v-model = "isShow"
      width = "300"
      @on-ok = "wx_public_sure"
      @on-cancel = "wx_public_cancel">
      <p>确定删除数据?</p>
    </Modal>
    <Table border :columns = "columns" :data = "wx_publics" :stripe = "true" class = "table"></Table>
    <Page :page-size = "25" :total = "total" show-elevator :current = "current_page" @on-change = "getWxPublics" show-total style = "text-align: right;margin-top: 20px;"></Page>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        columns: [
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
            filters: [
                {
                  label: '监控次数超过 15 次',
                  value: 1
                },
                {
                  label: '监控次数少于 5 次',
                  value: 2
                }
              ],
                filterMultiple: false,
                filterMethod (value, row) {
                  if (value === 1) {
                    return row.monitoring_count > 15;
                } else if (value === 2) {
                    return row.amonitoring_count < 5;
              }
            }
          },
          {
            title: '创建日期',
            key: 'created_at',
            align: 'center'
          },
          {
            title: '监控结束日期',
            key: 'end_at',
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
                    this.$router.push("/wx_publics/" + params.row.id + '/edit')
                  }
                }
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.showModal(params.row)
                  }
                }
              }, '删除'),
               h('i-switch', {
                props: {
                  size: 'default',
                  value: params.row.status,
                  'true-value': '0',                              
                  'false-value': '1'
                  // 'true-value': '0’,        //选中时:关闭,默认打开
                  //  'false-value': '1'       //没有选中时:打开
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  'on-change': (value) => {
                    this.active(params.row)
                  }
                }
              },[
                h('span', {                                       
                    slot: 'open',                                   
                    domProps: {                                     
                    innerHTML: '开'                               
                    }                                               
                  }),                                               
                h('span', {                                       
                  slot: 'close',                                  
                  domProps: {                                     
                  innerHTML: '关'                               
                }                                               
              }) 
            ])
          ])
        }
      }
    ],
        wx_publics: [],
        total: null,
        current_page: null,
        isShow: false,
        delete: null
      }
    },
  created () {
     this.getWxPublics()
     this.axios.get('/wx_publics/' + this.$route.params.id).then((res) => {
        this.wx_public = res.data.wx_public
      })
  },
  methods: {
    getWxPublics (page) {
      this.axios.get('/wx_publics?page=' + page).then(res=>{
        this.wx_publics = res.data.wx_publics;
        this.total = res.data.total;
        this.current_page = res.data.current_page;
      });
    },
    active (row, status) {
      this.axios.put('/wx_publics/' + row.id + '/active',{active: true}).then((res) => {
        if (res.data.status == 1) {
          this.$Message.info(res.data.notice)
          //this.getWxPublics(this.current_page)
        } else {
          this.$Message.error(res.data.notice)
        }
      })
    },                                                   
    create () {
       this.$router.push('/wx_publics/new')
     },
    showModal (row) {
      this.isShow = true;
      this.delete = row;
    },
    wx_public_sure () {
      this.axios.delete('/wx_publics/' + this.delete.id).then((res) => {
        if (res.data.status === 1) {
          this.wx_publics.splice(this.delete._index, 1);
          this.$Message.success('删除成功！');
        } else {
          this.$Message.error(res.data.notice)
        }
      })
    },
    wx_public_cancel () {
      this.$Message.info('取消删除！')
      this.getWxPublics(this.current_page)
    }
  }
}
</script>

<style scoped>
.table {
  margin-top: 20px;
}
</style>
