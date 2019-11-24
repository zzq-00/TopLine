<template>
  <div class="upload-image">
    <div class="avatar-uploader"  @click="onLoadImg">
      <img v-if="value" :src="value" class="avatar" width="200px" height="200px" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </div>
    <!-- <el-button type="text" >点击打开 Dialog</el-button> -->
    <el-dialog
      :visible.sync="centerDialogVisible"
      width="50%"
      center>
        <el-tabs v-model="activeName" type="card" >
          <el-tab-pane label="素材库" name="first">
            <el-radio-group v-model="type" @change="onFind">
              <el-radio-button label="全部"></el-radio-button>
              <el-radio-button label="收藏"></el-radio-button>
            </el-radio-group>
            <el-row style="margin-top:15px">
              <el-col
                :class="{'imgitem': index === activeIndex }"
                :span="4"
                v-for="(item, index) in images"
                :key="item.id"
                @click.native="activeIndex = index"
              >
                <img :src="item.url" width="80" height="80">
              </el-col>
            </el-row>
            <div style="text-align:center">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="this.totalCount">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="上传图片" name="second">
            <el-upload
              action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
              name="image"
              :headers="headers"
              list-type="picture-card"
              :on-preview="onPreview"
              >
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-tab-pane>
        </el-tabs>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="onConfirm">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ImgUpload',
  props: {
    value: {
      type: String
    }
  },
  data () {
    return {
      centerDialogVisible: false, // 弹框
      activeName: 'first', // 素材库/ 上传图片
      type: '全部', // 全部 、 收藏
      images: [], // 所有图片素才
      activeIndex: null, // 当前点击图片的索引
      page: 0,
      per_page: 1,
      totalCount: 0,
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('user-token')}`
      },
      previewImage: '' // 预览的图片地址
    }
  },
  created () {
    this.loadImg()
  },
  methods: {
    onLoadImg () {
      // 加载数据
      this.loadImg()
      // 显示弹框
      this.centerDialogVisible = true
    },
    loadImg (is_collect = false) {
      this.$axios({
        method: 'GET',
        url: '/user/images',
        params: {
          collect: is_collect // 是否是收藏
        }
      }).then(res => {
        // console.log(res)
        this.images = res.data.data.results
        this.totalCount = res.data.data.total_count
      })
    },
    onFind () {
      this.loadImg(this.type !== '全部')
    },
    onConfirm () {
      if (this.activeName === 'first') {
        // console.log(this.activeIndex)
        const image = this.images[this.activeIndex]
        if (image) {
          // this.previewImage = image.url //将选中的图片路径赋值给当前的~
          this.$emit('input', image.url)
        }
      } else if (this.activeName === 'second') {
        const previewImage = this.previewImage
        if (previewImage) {
          this.$emit('input', previewImage)
        }
      }
      // 关闭对话框
      this.centerDialogVisible = false
    },
    onPreview (file) {
      // console.log(file)
      this.previewImage = file.response.data.url
    }
  }
}
</script>

<style lang="less" scope>
.avatar-uploader{
  width: 200px;
  height: 200px;
  border:1px dashed #ccc;
  // margin-right:30px;
  font-size: 28px;
  float: left;
  display: flex;
  justify-content:center;
  align-items: center;
}
.imgitem img{
    width: 80px;
    height: 80px;
    box-shadow: 0 0 10px 2px rgba(58, 58, 58, 0.5);
    box-sizing: border-box;
  }
</style>
