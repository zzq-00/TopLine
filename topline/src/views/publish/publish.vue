<template>
  <div class="publish">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ $route.params.articleId ? '编辑文章' : '发布文章' }}</span>
      </div>
      <el-form ref="form" :model="articleform" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="articleform.title" ></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <quill-editor v-model="articleform.content"
                ref="myQuillEditor"
            >
            </quill-editor>
          </el-form-item>
          <el-form-item label="频道列表" >
            <!-- <el-select placeholder="请选择活动区域" v-model="articleform.channel_id">
              <el-option label="所有频道" :value="null"></el-option>
              <el-option
                  v-for="item in channels"
                  :key='item.id'
                  :label='item.name'
                  :value="item.id"
              ></el-option>
            </el-select> -->
            <channel-select v-model="articleform.channel_id"></channel-select>
          </el-form-item>
          <el-form-item label="封面">
            <el-radio-group v-model="articleform.cover.type">
              <el-radio :label="1">单图</el-radio>
              <el-radio :label="3">三图</el-radio>
              <el-radio :label="0">无图</el-radio>
              <el-radio :label="-1">自动</el-radio>
             </el-radio-group>
              <template v-if="articleform.cover.type >= 0">
                <el-row>
                  <el-col :span="5" v-for="(item,index) in articleform.cover.type" :key="item" class="col">
                      <UploadImage v-model="articleform.cover.images[index]"></UploadImage>
                  </el-col>
                </el-row>
              </template>
          </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(false)">保存</el-button>
          <el-button @click="onSubmit(true)">存为草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import ChannelSelect from '../../components/channel/channel-select'
import UploadImage from '../publish/uploadImage.vue'
export default {
  name: 'Publish',
  components: {
    quillEditor,
    'channel-select': ChannelSelect,
    UploadImage
  },
  data () {
    return {
      articleform: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 1, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [] // 图片，无图就是空数组即可
        },
        channel_id: ''
      }
      // channels: []
      // editorOption: {} // 富文本编辑器的配置选项对象
    }
  },
  created () {
    // this.loadChannel()
    // 添加和编辑使用的是同一个组件
    // 只有编辑才需要在初始化的时候，根据id获取加载文章的内容
    if (this.$route.params.articleId) {
      this.loadArticle()
    }
  },
  methods: {
    loadArticle () {
      this.$axios({
        method: 'get',
        url: `/articles/${this.$route.params.articleId}`
      }).then(res => {
        // console.log(res)
        this.articleform = res.data.data
      })
    },
    onSubmit (draft) {
      if (this.$route.params.articleId) {
        this.UpdateArticle(draft)
      } else {
        this.addArticle(draft)
      }
    },
    addArticle (draft) {
      this.$axios({
        method: 'POST',
        url: '/articles',
        // Headers 参数
        // headers: {
        //   Authorization: `Bearer ${window.localStorage.getItem('user-token')}`
        // },
        // Query 参数
        params: {
          draft
        },
        // Body 参数
        data: this.articleform
      }).then(res => {
        // console.log(res)
        this.$router.push('/article')
      }).catch(err => {
        console.log(err, '保存失败')
      })
    },
    UpdateArticle (draft) {
      this.$axios({
        method: 'Put',
        url: `/articles/${this.$route.params.articleId}`,
        // Headers 参数
        // headers: {
        //   Authorization: `Bearer ${window.localStorage.getItem('user-token')}`
        // },
        // Query 参数
        params: {
          draft
        },
        // Body 参数
        data: this.articleform
      }).then(res => {
        // console.log(res)
        this.$router.push('/article')
      }).catch(err => {
        console.log(err, '保存失败')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.col{
  display: flex;
  justify-content: flex-start;
}
</style>
