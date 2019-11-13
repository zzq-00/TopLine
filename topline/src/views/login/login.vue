<template>
  <div class="login">
    <!-- element-ui 卡片组件-->
    <el-card class="login-card">
      <!-- 卡片内容 -->
      <div class="title"><img src="../../img/logo_index.png" alt=""></div>
      <!-- 表单 moder表示表单数据对象 rule表示表单校验规则-->
      <el-form style="margin-top:30px" :rules="loginrule" :model="loginForm">
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
          <el-button type="primary" style="width:100%">登 录</el-button>
        </el-form-item>

      </el-form>
      <!-- <div slot="header" class="clearfix">
        <span>卡片名称</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div> -->
    </el-card>
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
