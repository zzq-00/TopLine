<template>
  <el-container>
      <!-- 左侧 -->
      <el-aside class="left">
          <div class="title-log">
              <img src="../../img/logo_admin.png" alt="">
          </div>
          <el-menu
            style="width:201px"
            background-color="#353b4e"
            text-color="#adafb5"
            active-text-color="#ffd04b"
          >
              <el-menu-item>首页</el-menu-item>
              <el-submenu>
                  <template slot="title">内容管理</template>
                  <el-menu-item>发布内容</el-menu-item>
                  <el-menu-item>文章列表</el-menu-item>
                  <el-menu-item>评论管理</el-menu-item>
                  <el-menu-item>素材管理</el-menu-item>
              </el-submenu>
              <el-submenu>
                  <template slot="title">粉丝管理</template>
                  <el-menu-item>粉丝</el-menu-item>
                  <el-menu-item>粉丝</el-menu-item>
                  <el-menu-item>粉丝</el-menu-item>
                  <el-menu-item>粉丝</el-menu-item>
              </el-submenu>
              <el-menu-item>账户管理</el-menu-item>
          </el-menu>
      </el-aside>
      <el-container>
          <!-- 头部 -->
          <el-header>
              <lay-out></lay-out>
          </el-header>
          <el-main>主题内容</el-main>
      </el-container>
  </el-container>
</template>

<script>
import Layout2 from '../../components/layout-header/layout-header2.vue'
export default {
  components: {
    'lay-out': Layout2
  }
}
</script>
<style lang='less' scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .left{
        width: 200px!important;
        height: 100vh;
        overflow: hidden;
        background-color: #353b4e;
        .title-log{
            text-align: center;
        }
    }
</style>
