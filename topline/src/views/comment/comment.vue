<template>
  <div>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>评论管理</span>
        </div>
        <el-table
            :data="articles"
            style="width: 100%">
            <el-table-column
                prop="title"
                label="标题"
                width="180">
            </el-table-column>
            <el-table-column
                prop="total_comment_count"
                label="总评论数">
            </el-table-column>
            <el-table-column
                prop="fans_comment_count"
                label="粉丝评论数">
            </el-table-column>
            <el-table-column
                label="评论状态"
                width="180">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.comment_status"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        @change="onStatusChange(scope.row)"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" @click="$router.push('/comment/'+scope.row.id)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
      </el-card>
      <div style="text-align:center;margin-top:15px">
        <el-pagination
            background
            layout="prev, pager, next"
            :total="1000"
            @current-change='onPageChange'
        >
        </el-pagination>
      </div>
  </div>
</template>

<script>
export default {
  name: 'CommentIndex',
  data () {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      articles: [],
      page: 0,
      totalCount: 0
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    loadArticles (page) {
      this.$axios({
        method: 'GET',
        url: '/articles',
        params: {
          response_type: 'comment',
          page,
          per_page: 10
        }
      }).then(res => {
        // console.log(res)
        // console.log(res.data.data.results)
        this.articles = res.data.data.results
        this.totalCount = res.data.data.total_count
      }).catch(err => {
        console.log(err, '加载失败')
      })
    },
    onStatusChange (article) {
      // console.log(article)
      this.$axios({
        method: 'PUT',
        url: '/comments/status',
        params: {
          article_id: article.id.toString()
        },
        data: {
          allow_comment: article.comment_status
        }
      }).then(res => {
        // console.log(res)
        this.$message({
          type: 'success',
          message: `${article.comment_status ? '启用' : '关闭'}`
        })
      }).catch(err => {
        console.log(err)
        this.$message.error('操作失败')
      })
    },
    onPageChange (page) {
      this.page = page
      this.loadArticles(page)
    }
  }
}
</script>

<style>

</style>
