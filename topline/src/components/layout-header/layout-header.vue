<template>
    <!-- 头部组件 -->
    <el-row align='middle' type='flex' justify='space-between'>
        <el-col :span='6' class="left">
            <i class="el-icon-s-fold"></i>
            <span>江苏传智博客</span>
        </el-col>
        <el-col :span='4' class="right">
            <!-- 头像 -->
            <img src="../../img/zly.jpg" alt="" style="width:30px;height:30px">
            <!-- 下拉菜单 -->
            <el-dropdown trigger="click">
                <span>赵丽颖</span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>账户信息</el-dropdown-item>
                    <el-dropdown-item>git地址</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
    </el-row>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.left{
    display: flex;
    align-items: center;
    i {
        font-size: 24px;
    }
    span{
        margin-left: 4px;
    }
}
.right {
    display: flex;
    align-items: center;
    img {
        border-radius: 50%;
        margin-right:10px;
    }
}
</style>
