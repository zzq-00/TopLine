<template>
  <div class="login">
      <el-card class="login-card">
          <div class="login-img">
              <img src="../../img/logo_index.png" >
          </div>
          <!-- 绑定属性 rule表示校验表单 model表示表单数据 ref 可通过this.$refs.属性 获取DOM对象-->
          <el-form :rules="rules" ref="formObj" :model="form">
              <!-- prop 用来校验表单 -->
              <el-form-item prop="mobile">
                <el-input v-model='form.mobile' placeholder="请输入手机号"></el-input>
              </el-form-item>
              <el-form-item prop="code">
                <el-input v-model='form.code' style="width:260px;margin-right:15px" placeholder="请输入验证码"></el-input>
                <el-button plain>发送验证码</el-button>
              </el-form-item>
              <el-form-item prop="checked">
                <el-checkbox v-model="form.checked">我已阅读并同意协议</el-checkbox>
              </el-form-item>
              <el-form-item >
                <el-button type="primary" class="btn" @click="loginbtn">登录</el-button>
              </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        mobile: '',
        code: '',
        checked: false
      },
      // 自动校验
      rules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { patter: /^1[13456789]\d{9}$/, message: '请输入正确的手机号' }
        ],
        code: [
          { required: true, message: '请输入您的验证码' },
          { patter: /^d{6}$/, message: '请输入6位验证码' }
        ],
        checked: [{ validator: function (rule, value, callback) {
          if (value) {
            callback()
          } else {
            callback(new Error('勾选后才能登录'))
          }
        } }]
      }
    }
  },
  methods: {
    loginbtn () {
      //  获取表单DOM对象
    //   this.$refs.formObj
    //   console.log(this.$refs.formObj)
      this.$refs.formObj.validate((isOk) => {
        if (isOk) {
          this.$axios({
            method: 'post',
            url: '/authorizations',
            data: this.form
          }).then((res) => {
            window.localStorage.setItem('token', res.data.data.token)
            this.$router.push('/index2')
          }).catch(() => {
            this.$message({
              message: '手机号或者验证码错误',
              type: 'waring'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login{
    background-image: url('../../img/login_bg.jpg');
    height: 100vh;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-card{
        width: 440px;
        height: 340px;
        background-color: #fff;
        .login-img{
            text-align: center;
            height: 60px;
            img{
                height: 40px;
            }
        }
        .btn{
            width: 100%
        }
    }
}
</style>
