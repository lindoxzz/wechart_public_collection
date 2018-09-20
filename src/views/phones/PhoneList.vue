<template>
  <div >
    <Row>
      <Col :xs="17" :sm="19" :md="20" :lg="20">
        <Input clearable placeholder= "请输入搜索内容" style= "width: 40%; margin-right: 10px;" v-model= "search"></Input>
        <Button type= "primary" icon= "ios-search" @click= "getPhones()">搜索</Button>
      </Col>
    </Row>
    <Table 
        class = "table"
        :columns = "columns" 
        :data = "phones" 
        :stripe = "true" 
        border>
    </Table>
    <Page 
        :page-size = "25" 
        :total = "total" 
        :current = "current_page" 
        @on-change = "getPhones" 
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
      filterType: '',
      search: '',            //绑定查询数据
      phones: [],           //设备
      total: null,          //总条数
      current_page: null,   //当前页数
      columns: [            //列名
        {
          title: '设备号',
          key: 'sn',
          align: 'center'
        },
        {
          title: '文章名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '设备状态',
          key: 'status',
          align: 'center',
          // filterMultiple: false,
                        // filters: [
                        //     {
                        //         label: '掉线',
                        //         value: '-1'
                        //     },
                        //     {
                        //         label: '未分配',
                        //         value: '0'
                        //     },
                        //     {
                        //         label: '使用中',
                        //         value: '1'
                        //     }
                        // ],
                        // filterMethod (value, row, index) {
                        //     if (value === -1 && index === 0) {
                        //         return '掉线';
                        //     } else if (value === 0 && index === 1) {
                        //         return '未分配';
                        //     } else if (value === 1 && index === 2) {
                        //         return '使用中';
                        //     }
                        // },
          render: (h,params) => {
            switch (params.row.status) {
              case -1:
                return h('div','掉线')
              case 0:
                return h('div','未分配')
              case 1:
                return h('div','使用中')
            }
          }
        },
        {
          title: '登录时间',
          key: 'start_time',
          align: 'center'
        },
        {
          title: '创建时间',
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
                    this.$router.push('/phones/' + params.row.id + '/detail')
                  }
                }
              }, '详细信息')
            ])
          }
        }
      ]
    }
  },
  // computed: {
  //   queryData: function () {
  //     let _this = this;
  //     //根据input的value值筛选phones中的数据
  //     let arrPhone = [];//声明一个空数组来存放数据
  //     for (let i=0;i<this.phones.length;i++){
  //     //for循环数据中的每一项（根据name值）
  //       if(this.phones[i].name.search(this.query) != -1){
  //     //判断输入框中的值是否可以匹配到数据，如果匹配成功,向空数组中添加数据
  //       arrPhone.push(this.phones[i]);
  //       }
  //     }
  //     return arrPhone;
  //   }
  // },
  created () {
    this.getPhones()
  },
  computed: {
        filtedData() {
            return this.data.filter((item) => {
                return this.filterType === '' || item.status === this.filterType
            })
        }
    },
  methods: {
    getPhones (page) {
      this.axios.get(`/phones?page=${page}&search=${this.search}`).then((res) => {
        this.phones = res.data.phones
        this.total = res.data.total
        this.current_page = res.data.current_page
      })
    }
  }
}
</script>

<style>
  .table {
  margin-top: 20px;
}
</style>


