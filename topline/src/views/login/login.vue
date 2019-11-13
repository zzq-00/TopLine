<template>
  <div class="login">
    <!-- element-ui 卡片组件-->
    <el-card class="login-card">
      <!-- 卡片内容 -->
      <div class="title"><img src="../../img/logo_index.png" alt=""></div>
      <!-- 表单 -->
      <el-form style="margin-top:30px">
        <el-form-item>
          <el-input placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item >
          <el-input style="width:280px" placeholder="请输入验证码"></el-input>
          <el-button plain style="float:right">发送验证码</el-button>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">阅读并同意</el-checkbox>
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
