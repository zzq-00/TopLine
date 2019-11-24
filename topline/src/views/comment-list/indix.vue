<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
        <span>评论详情列表</span>
    </div>
    <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="头像"
          width="180">
          <template slot-scope="scope">
            <img width="50" :src="scope.row.aut_photo">
          </template>
        </el-table-column>
        <el-table-column
          prop="content"
          label="评论内容"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="点赞"
          width="180">
          <template slot-scope="scope">
            {{ scope.row.is_liking === 1 ? '已赞' : '没有赞' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="like_count"
          label="点赞数量"
          width="180">
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="评论日期"
          width="180">
          <template slot-scope="scope">{{ scope.row.pubdate | dateFormat}}</template>
        </el-table-column>
        <el-table-column
          prop="reply_count"
          label="是否推荐"
          width="180">
          <template slot-scope='scope'>
            <el-switch
              v-model="scope.row.is_top"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="onTop(scope.row)"
              >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="reply_count"
          label="回复数量"
          width="180">
        </el-table-column>
      </el-table>
  </el-card>
</template>

<script>
// import moment from 'moment'
export default {
  name: 'CommentList',
  // 除了可以通过 this.$route.params 获取路由参数
  // 还有一种更方便的方式：通过 props 解耦，说白了就是自动把路由参数映射到 props 中
  // 然后就可以像访问 data 数据一样来访问路由参数了
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.loadComments()
  },
  // 局部过滤器
  // 实力选项过滤器 全局 局部
  // 作用：常用于一些简单的文本格式化，例如日期格式化处理
  // 语法格式{{数据 | 过滤器函数}}
  // filters: {
  //   dataFormat (value) {
  //     return moment(value).format('YYYY-MM-DD')
  //   }
  // },
  methods: {
    loadComments () {
      this.$axios({
        method: 'get',
        url: '/comments',
        params: {
          // 评论类型， a-文章的评论，b评论的回复
          type: 'a',
          // 文章id，评论id
          source: this.articleId // this.$route.params.articleId
        }
      }).then(res => {
        console.log(res)
        this.tableData = res.data.data.results
      }).catch(err => {
        console.log(err, '获取评论列表失败')
      })
    },
    // 评论是否置顶
    // onTop (comment) {
    //   console.log(comment)
    //   this.$axios({
    //     method: 'put',
    //     url: `/comments/${comment.com_top}/sticky`,
    //     data: {
    //       sticky: comment.is_top
    //     }
    //   }).then(res => {
    //     console.log(res)
    //     this.$message('操作成功')
    //   }).catch(() => {
    //     this.$message.error('操作失败')
    //   })
    // }
    onTop (comment) {
      this.$axios({
        method: 'PUT',
        url: `/comments/${comment.com_id}/sticky`,
        data: {
          // comment.is_top 双向绑定给了开关按钮
          // 所以获取 comment.is_top 就是在获取开关的状态
          sticky: comment.is_top
        }
      }).then(res => {
        this.$message('操作成功')
      }).catch(err => {
        this.$message.error('操作失败', err)
      })
    }
  }
}
</script>

<style>
</style>
