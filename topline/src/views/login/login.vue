<template>
  <div class="login">
    <!-- element-ui 卡片组件-->
    <el-card class="login-card">
      <!-- 卡片内容 -->
      <div class="title"><img src="../../img/logo_index.png" alt=""></div>
      <!-- 表单 moder表示表单数据对象 rule表示表单校验规则-->
      <!-- ref可以获取DOM对象
      ref也可以获取组件
      常见面试问题：vue中获取DOM元素方法 ref
      ref得值要唯一，否则后者会覆盖前者
      组件是一个特殊的Vue实例 this
      -->
      <el-form
        ref='formDom'
        style="margin-top:30px"
        :rules="loginrule"
        :model="loginForm">
        <el-form-item prop="mobile">

          <el-input placeholder="请输入手机号" v-model="loginForm.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input style="width:280px" placeholder="请输入验证码" v-model="loginForm.code"></el-input>
          <el-button plain style="float:right" >发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="checked">
          <el-checkbox v-model="loginForm.checked">阅读并同意</el-checkbox>
        </el-form-item>
        <el-form-item style="text-align:center">
          <el-button @click="login" type="primary" style="width:100%">登 录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- ref 标签属性 可通过this.$refs.属性获取DOM对象 -->
    <!-- <div ref='div'></div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 要校验的表单数据
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        checked: false// 是否勾选协议
      },
      // 校验规则对象
      // required: true 只校验null和undefined
      loginrule: {
        // key(要校验的字段名)：value（数组=》多条或1条没有规则）
        mobile: [
          { required: true, message: '请输入您的手机号' },
          { patter: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' }
        ],
        code: [
          { required: true, message: '请输入您的验证码' },
          { patter: /^d{6}$/, message: '请输入6位' }
        ],
        // validator 自校验函数
        checked: [{ validator: function (rule, value, callback) {
          // rule代表当前规则,没啥用
          // value代表当前的值=》checked的值,
          // callback=》回调函数
          if (value) {
            // 如果是true 就是选中 通过校验
            callback() // 直接执行 表示直接通过
          } else {
            // 没有选中 不通过校验 抛出一个提示
            callback(new Error('勾选后才能登陆'))
          }
        } }]

      }
    }
  },
  methods: {
    // 手动检验
    login () {
      // 通过this.$refs.属性---获取DOM对象
      // this.$refs.formDom  获取el-form的对象实例
      // el-form 组件有validate方法，用于手动触发校验
      // validate 整个表单的校验方法
      this.$refs.formDom.validate((isOk) => {
        if (isOk) {
          // 如果为true 继续下一步 调用接口 登录
          this.$axios({
            method: 'post',
            url: '/authorizations',
            data: this.loginForm
          }).then((res) => {
            // console.log(res.data)
            // res.data.data.token 获取token 存到本地浏览器
            window.localStorage.setItem('user-token', res.data.data.token)
            // 跳转到主页
            this.$router.push('/layout')
          }).catch(() => {
            // 提示信息
            this.$message({
              message: '手机号或者验证码错误',
              type: 'warning'
            })
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .login{
    background-image:url("../../img/login_bg.jpg");
    height: 100vh;//v-表示当前屏幕
    background-size: cover;//自适应
    display: flex;
    justify-content: center;
    align-items: center;
    .login-card{
      width: 450px;
      height: 360px;
      .title{
        text-align: center;
        img{
          height: 45px;
        }
      }
    }
  }
</style>
