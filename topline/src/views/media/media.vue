<template>
  <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>图片管理</span>
    <el-upload
      class="upload-demo"
      action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
      :headers="headers"
      multiple
      name="image"
      :on-success="onUploadImg"
      :show-file-list = "false"
       style="float: right"
      >
      <el-button style="padding: 10px 10px" type="primary">上传图片</el-button>
    </el-upload>
  </div>
  <div>
    <el-radio-group v-model="type" @change="onFind">
      <el-radio-button label="全部" >全部</el-radio-button>
      <el-radio-button label="收藏" >收藏</el-radio-button>
    </el-radio-group>
  </div>
  <div style="margin-top:30px">
    <el-row :gutter="10">
      <el-col :xs="12" :md="8" :lg="6" v-for="item in images" :key="item.id">
        <el-card >
          <img
            :src="item.url"
            class="image"
            height="200"
          />
          <div style="padding: 14px;" class="action" >
            <!-- class 还支持对象语法， 'el-icon-star-off': !item.is_collected -->
            <i
              @click="collectImg(item)"
              :class="{'el-icon-star-off':!item.is_collected,'el-icon-star-on':item.is_collected }"
            ></i>
            <!-- class 本来就是绑定数据字符串 -->
            <!-- <i :class="item.is_collected ? 'el-icon-star-on': 'el-icon-star-off'"></i> -->
            <i class="el-icon-delete-solid" @click="onDel(item)"></i>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</el-card>
</template>

<script>
export default {
  name: 'Media',
  components: {},
  props: {},
  data () {
    return {
      type: '全部',
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('user-token')}`
      },
      images: []
    }
  },
  created () {
    this.loadImgs()
  },
  // false--全部  true--收藏
  methods: {
    loadImgs (isCollect = false) {
      this.$axios({
        method: 'GET',
        url: '/user/images',
        params: {
          collect: isCollect // 是否是收藏
        }
      }).then((res) => {
        // window.console.log(res)
        this.images = res.data.data.results
      })
    },
    // 点击 全部/收藏 加载图片
    onFind (type) {
      // console.log(type)
      // console.log(type !== '全部')
      this.loadImgs(type !== '全部')
    },
    // 点击收藏图标---收藏图片
    collectImg (value) {
      // console.log(value)// 点击后--状态转换
      // console.log('状态' + value.is_collected)// 状态为点击前的
      this.$axios({
        method: 'PUT',
        url: `/user/images/${value.id}`,
        data: {
          collect: !value.is_collected // 点击前的状态--取反--是点击后的状态
        }
      }).then(res => {
        console.log(res)
        this.$message({
          type: 'success',
          message: '收藏成功'
        })
        // console.log(value.is_collected)
        // 当前的样式
        value.is_collected = !value.is_collected
      }).catch(() => {
        this.$message.error('收藏失败')
      })
    },
    // 点击删除--删除此图片
    onDel (item) {
      this.$axios({
        method: 'delete',
        url: `/user/images/${item.id}`
      }).then(res => {
        console.log(res)
        this.loadImgs(this.type !== '全部')
      }).catch(() => {
        this.$message.error('删除失败')
      })
    },
    // 点击上传图片--更新页面
    onUploadImg () {
      this.type = '全部'
      this.loadImgs(this.type !== '全部')
    }
  },
  computed: {},
  watch: {}
}

</script>

<style scoped lang="less">
.action{
  display: flex;
  justify-content: space-around;
  align-items: center;
  i{
    font-size: 24px;
  }
}
</style>
