<template>
    <el-card>
        <div>账号信息</div>
        <el-row>
          <el-col>
          <el-form label-width="80px" style="width:500px" :model="user">
              <el-form-item label="用户头像">
                <el-upload
                  class="avatar-uploader"
                  action="http://ttapi.research.itcast.cn/mp/v1_0/user/photo"
                  :headers="headers"
                  :http-request="onUpload"
                  :show-file-list="false"
                  name="image">
                  <img v-if="user.photo" :src="user.photo" class="avatar" style="height:50px">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="用户昵称" >
                <el-input v-model="user.name"></el-input>
              </el-form-item>
              <el-form-item label="个人介绍" >
                <el-input v-model="user.intro"></el-input>
              </el-form-item>
              <el-form-item label="用户邮箱" >
                <el-input v-model="user.email"></el-input>
              </el-form-item>
              <el-form-item label="手机号" >
                <el-input v-model="user.mobile"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSave">保存修改</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
    </el-card>
</template>

<script>
import eventBus from '../../unit/event-bus.js'
export default {
  name: 'Accout',
  components: {},
  props: {},
  data () {
    return {
      user: {
        name: '', // 昵称不能超过7字符
        intro: '', // 个人介绍
        email: '', // 邮箱
        mobile: '', // 手机
        photo: '' // 手机号
      },
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('user-token')}`
      }
    }
  },
  created () {
    this.loadProfile()
  },
  methods: {
    // 加载用户信息
    loadProfile () {
      this.$axios({
        method: 'get',
        url: '/user/profile'
      }).then(res => {
        // console.log(res)
        this.user = res.data.data
      })
    },
    // 编辑头像，改变组件默认的上传方式
    onUpload (config) {
      // console.log(config)
      const formdata = new FormData()
      formdata.append('photo', config.file) // 在表单中加photo字段，上传图片的地址
      this.$axios({
        method: 'patch',
        url: '/user/photo',
        data: formdata
      }).then(res => {
        console.log(res)
        this.user.photo = res.data.data.photo
      }).catch(() => {
        this.$message.error('上传头像失败')
      })
    },
    // 点击保存修改的数据
    onSave () {
      this.$axios({
        method: 'patch',
        url: '/user/profile',
        data: {
          name: this.user.name,
          intro: this.user.intro,
          email: this.user.email
        }
      }).then(res => {
        console.log(res)
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        // 更新用户信息成功后，通知头部组件【发布】
        eventBus.$emit('update-user', this.user)
      }).catch(() => {
        this.$message.error('保存数据失败')
      })
    }
  },
  computed: {},
  watch: {}
}

</script>

<style scoped lang="less">
</style>
