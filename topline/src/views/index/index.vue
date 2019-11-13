<template>
    <el-container>
        <!-- 左右布局 -->
        <el-aside class="left" style="width:220px">
            <div class="menu-title">
                <img src="../../img/logo_admin.png" alt="">
            </div>
            <!-- 菜单 -->
            <el-menu
                style="width:221px"
                background-color="#353b4e"
                text-color="#adafb5"
                active-text-color="#ffd04b"
            >
                <!-- 一级菜单 -->
                <el-menu-item>首页</el-menu-item>
                <!-- 二级菜单 -->
                <el-submenu>
                    <template slot="title">内容管理</template>
                    <el-menu-item>发布文章</el-menu-item>
                    <el-menu-item>内容列表</el-menu-item>
                    <el-menu-item>评论列表</el-menu-item>
                    <el-menu-item>素材管理</el-menu-item>
                </el-submenu>
                <!-- 二级菜单 -->
                <el-submenu>
                    <template slot="title">粉丝管理</template>
                    <el-menu-item>图文数据</el-menu-item>
                    <el-menu-item>粉丝概况</el-menu-item>
                    <el-menu-item>粉丝画像</el-menu-item>
                    <el-menu-item>粉丝列表</el-menu-item>
                </el-submenu>
                <el-menu-item>账户信息</el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header>
                <layout-header></layout-header>
            </el-header>
            <!-- 中间容器--二级路由 -->
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import layoutHeader from '../../components/layout-header/layout-header.vue'
export default {
  components: {
    'layout-header': layoutHeader
  }
}
</script>

<style lang='less' scoped>
    .left{
        width:220px;
        height: 100vh;
        background-color: #353b4e;
        overflow: hidden;
        .menu-title{
            padding: 15px 0;
            text-align: center;
            background-color:#2e2f32;
            img{
                height: 30px;
            }
        }
    }
</style>
