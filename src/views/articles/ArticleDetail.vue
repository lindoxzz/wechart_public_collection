<template>
  <div>
    <div>
      文章标题:
      <span>{{article.title}}</span>
    </div>
    <div>
      文章内容:
      <span>{{article.content}}</span>
    </div>
    <div>
      文章链接地址:
      <span>{{article.url}}</span>
    </div>
    <div>
      文章描述:
      <span>{{article.desc}}</span>
    </div>
    <div>
      文章作者:
      <span>{{article.author}}</span>
    </div>
    <div>
      文章当前浏览量:
      <span>{{article.view_count}}</span>
    </div>
    <div>
      是否开启监控:
      <span>{{article.is_open}}</span>
    </div>
    <div>
      文章状态:
      <span>{{article.status}}</span>
    </div>
    <div>
      文章发布时间:
      <span>{{article.release_at}}</span>
    </div>
    <div>
      文章创建时间:
      <span>{{article.created_at}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      article: {}
    }
  },
  created () {
    let wx_publicId = this.$route.params.wx_public_id
    let articleId = this.$route.params.id
    this.articleDetail = '文章详情'
    this.axios.get('/wx_publics/' + wx_publicId + '/articles/' + articleId).then((res) => {
      this.article = res.data.article
    })
  }
}
</script>

