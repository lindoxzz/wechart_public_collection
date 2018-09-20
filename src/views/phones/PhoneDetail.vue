<template>
      <Card style= "width:650px">
        <div class="detail">
          <div>
            设备号：
            <span>{{phone.sn}}</span>
          </div> 
          <div>
            文章名称：
            <span>{{phone.name}}</span>
          </div>
          <div>
            设备状态：
            <span>{{phone.status}}</span>
          </div>
          <div>
            登录时间：
            <span>{{phone.start_time}}</span>
          </div>
          <div>
            创建时间：
            <span>{{phone.created_at}}</span>
          </div>
        </div>
    </Card>
</template>

<script>
  export default {
    data() {
      return {
        phone: {}
      }
    },
    created () {
      let phoneId = this.$route.params.id
        console.log(phoneId)
      this.axios.get('/phones/' + phoneId).then((res) => {
        this.phone = res.data.phone
      })
     },
     methods: {
       back () {
         this.$router.go(-1)
       }
     }
  }
</script>

<style scoped>
  
</style>