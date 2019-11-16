<template>
  <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>共找到59806条符合条件的内容</span>
      </div>
      <el-table
        :data="articleList"
        style="width: 100%">
        <el-table-column
          prop="cover"
          label="封面"
          width="180">
          <template slot-scope="scope">
              <img :src="scope.row.cover.images[0]" width="50">
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <el-tag
              :type="articleStatus[scope.row.status].type"
            >{{ articleStatus[scope.row.status].label }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布日期">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <el-button type="primary" size="mini">编辑</el-button>
        <el-button type="info" size="mini">删除</el-button>
        </el-table-column>
      </el-table>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      articleList: [],
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      articleStatus: [
        {
          type: '',
          label: '草稿'
        }, {
          type: 'waring',
          label: '待审核'
        }, {
          type: 'success',
          label: '审核通过'
        }, {
          type: 'danger',
          label: '审核失败'
        }, {
          type: 'info',
          label: '已删除'
        }
      ]
    }
  },
  created () {
    this.loadArticle()
  },
  methods: {
    loadArticle () {
      // 在项目中，除了登录页不需要，其他所有接口都需要提供token
      const token = window.localStorage.getItem('user-token')
      this.$axios({
        method: 'get',
        url: '/articles',
        headers: { // 添加请求头
          // token的格式要求：Bearer token的值
          authorization: `Bearer ${token}`
        }
      }).then((res) => {
        // console.log(res)
        this.articleList = res.data.data.results
      }).catch((err) => {
        console.log(err, '获取数据失败')
      })
    }
  }
}
</script>

<style>

</style>
