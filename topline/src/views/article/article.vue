<template>
  <div class="article">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>全部图文</span>
      </div>
       <el-form  label-width="80px" >
          <el-form-item label="文章状态" >
            <el-radio-group v-model="filterForm.status">
              <el-radio label="全部"></el-radio>
              <el-radio label="草稿"></el-radio>
              <el-radio label="待审核"></el-radio>
              <el-radio label="审核通过"></el-radio>
              <el-radio label="审核失败"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="频道列表">
            <el-select  placeholder="请选择活动区域"  v-model="filterForm.channel_id">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择时间" >
            <el-date-picker
              v-model="rangetime"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>
    </el-card>
    <!-- 文章列表 -->
    <article-list></article-list>
  </div>
</template>

<script>
import ArticleList from './articleList.vue'
export default {
  components: {
    'article-list': ArticleList
  },
  name: 'Article',
  data () {
    return {
      filterForm: {
        status: '',
        channel_id: '',
        stat_time: '',
        end_time: ''
      },
      rangetime: ''
    }
  },
  created () {
    // this.loadArticle()
  },
  methods: {
    // loadArticle () {
    //   // 在项目中，除了登录页不需要，其他所有接口都需要提供token
    //   const token = window.localStorage.getItem('user-token')
    //   this.$axios({
    //     method: 'get',
    //     url: '/articles',
    //     headers: { // 添加请求头
    //       // token的格式要求：Bearer token的值
    //       authorization: `Bearer ${token}`
    //     }
    //   }).then((res) => {
    //     this.articleList = res.data.data
    //   }).catch((err) => {
    //     console.log(err, '获取数据失败')
    //   })
    // }
  }
}
</script>

<style>
</style>
