<template>
  <div class="articlelist">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>共找到{{ totalCount }}条符合条件的内容</span>
      </div>
      <!-- el-table 表格组件
      data 表格的数组，要求是数组
      表格组件会使用 data 数据，在内部自己进行遍历，我们不需要自己写什么 v-for
      你只需要告诉这个表格组件
      el-table-column 表格列组件
          prop 用来指定渲染哪个数据字段
          label 表头名称
          width 列宽
            表格列默认只能渲染普通文本，如果想要渲染点儿别的东西，需要自定义表格列 -->
      <el-table :load='loading' :data="articleList" style="width: 100%">
        <el-table-column prop="cover" label="封面" width="180">
          <!-- 如果需要访问遍历项item -->
          <template slot-scope="scope">
              <!-- 需要通过 scope.row 来获取每一项，相当于是item -->
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
            <el-tag :type="articleStatus[scope.row.status].type">
              { articleStatus[scope.row.status].label }}
            </el-tag>
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
    <!-- 分页
      分页组件 默认每页10条haufen
      totle 用来指定一共有多少条数据
      background beijingse
      layout 用来控制局
     -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalCount"
      @current-change='onPageChange'
      :disabled="loading"
      >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'ArticleList',
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
      ],
      totalCount: 0, // 默认0
      loading: true
    }
  },
  created () {
    this.loadArticle()
  },
  methods: {
    // 如果没传，就默认为1
    loadArticle (page = 1) {
      this.loading = true
      // 在项目中，除了登录页不需要，其他所有接口都需要提供token
      const token = window.localStorage.getItem('user-token')
      this.$axios({
        method: 'get',
        url: '/articles',
        headers: { // 添加请求头
          // token的格式要求：Bearer token的值
          authorization: `Bearer ${token}`
        },
        // Query 参数使用 params 传递
        params: {
          page: page, // 页码
          per_page: 10 // 每页大小，默认10条
        }
      }).then((res) => {
        // console.log(res)
        this.articleList = res.data.data.results
        this.totalCount = res.data.data.total_count
      }).catch((err) => {
        console.log(err, '获取数据失败')
      }).finally(() => { // 无论成功或失败
        this.loading = false
      })
    },
    onPageChange (page) {
      console.log(page)// 点击的页码
      this.loadArticle(page)
    }
  }
}
</script>

<style>

</style>
