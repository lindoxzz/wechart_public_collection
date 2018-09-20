<template>
  <div v-if="wx_public">
    <div class="form-title">
      <h3>{{formTitle}}</h3>
    </div>
    <Form :model="wx_public" :label-width="100" ref="wx_public" :rules="ruleInline">

      <FormItem label="公众号名称" prop="name">
        <Input v-model="wx_public.name" placeholder="公众号名称"></Input>
      </FormItem>

      <FormItem label="公众号描述" prop="desc">
        <Input v-model="wx_public.desc" placeholder="公众号描述"></Input>
      </FormItem>

      <FormItem label="公众号文章默认采集条数" prop="collect_count">
        <Input v-model="wx_public.collect_count" placeholder="公众号文章默认采集条数"></Input>
      </FormItem>

      <FormItem label="文章监控频率" prop="monitoring_rate">
        <Input v-model="wx_public.monitoring_rate" placeholder="文章监控频率"></Input>
      </FormItem>

      <FormItem label="监控次数" prop="monitoring_count">
        <Input v-model="wx_public.monitoring_count" placeholder="监控次数"></Input>
      </FormItem>

      <FormItem label="监控结束日期" prop="end_at">
        <DatePicker type="date" placeholder="选择日期" v-model="wx_public.end_at"></DatePicker>
      </FormItem>

      <FormItem>
        <Button type="primary" @click="handleSubmit('wx_public')">提交</Button>
        <Button type="ghost" style="margin-left: 8px" @click="back">返回</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      wx_public: {
        name: '',
        desc: '',
        collect_count: null,
        monitoring_rate: null,
        monitoring_count: null,
        end_at: ''
      },
       ruleInline: {
         name: [
           { required: true, message: '公众号名称',trigger: 'blur' }
         ],
      //   desc: [
      //     { required: true, type: 'string', message: '公众号描述', trigger: 'blur'}
      //   ],
         collect_count: [
           { required: true, message: '公众号文章默认采集条数', trigger: 'change'}
         ],
         monitoring_rate: [
           { required: true, message: '文章监控频率', trigger: 'change'}
         ],
         monitoring_count: [
           { required: true, message: '监控次数', trigger: 'change'}
         ],
         end_at: [
           { required: true, type: 'date', message: '选择日期', trigger: 'change' }
         ],
       },
      formTitle: ''
    }
  },
  created () {
    if (this.$route.name === 'wx_publicNew') {
      this.formTitle = '新建公众号'
    } else {
      this.formTitle = '编辑公众号'
      console.log(this.$route.params.id)
      this.axios.get('/wx_publics/' + this.$route.params.id).then((res) => {
        this.wx_public = res.data.wx_public
      })
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.commitSave()
        }
      })
    },
    commitSave () {
      if (this.$route.name === 'wx_publicNew') {
        //新建
        this.axios.post('/wx_publics', {wx_public: this.wx_public}).then((res) => {
          if (res.data.status === 1) {
            this.$Message.success('新建成功！')
          } else {
            this.$Message.error(res.data.notice)
          }
          this.$router.push('/wx_publics')
        })
      } else {
        //修改
        this.axios.put('/wx_publics/' + this.$route.params.id, {wx_public: this.wx_public}).then((res) => {
          if (res.data.status === 1) {
            this.$Message.success('修改成功！')
          } else {
            this.$Message.error(res.data.notice)
          }
          this.$router.push('/wx_publics')
        })
      }
    },
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
