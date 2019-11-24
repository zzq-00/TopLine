<template>
    <!-- 头部组件 -->
    <el-row align='middle' type='flex' justify='space-between'>
        <el-col :span='6' class="left">
            <i class="el-icon-s-fold"></i>
            <span>江苏传智博客</span>
        </el-col>
        <el-col :span='4' class="right">
            <!-- 头像 -->
            <img :src="user.photo" alt="" style="width:30px;height:30px">
            <!-- 下拉菜单 -->
            <el-dropdown trigger="click">
                <span>{{ user.name }}</span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>账户信息</el-dropdown-item>
                    <el-dropdown-item>git地址</el-dropdown-item>
                    <!-- 如果想要给一个组建注册一个原声 js事件，使用 .nattive 修饰符 -->
                    <el-dropdown-item @click.native='onLogout'>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
    </el-row>
</template>

<script>
import eventBus from '../../unit/event-bus.js'
export default {
  name: 'layHeader',
  data () {
    return {
      user: {
        name: '', // 用户昵称
        photo: '' // 用户头像
      }
    }
  },
  created () {
    this.loadUser()
    // 想要根据个人信息的修改--联动用户头像的改变
    // 在初始化created 监听自定义事件
    // 在头部组件注册监听---订阅
    eventBus.$on('update-user', (user) => {
      console.log(user)
      // 逻辑代码
      this.user.name = user.name
      this.user.photo = user.photo
    })
  },
  methods: {
    // 点击退出
    onLogout () {
      this.$confirm('确认退出嘛,?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$message({
          type: '',
          message: '退出成功'
        })
        this.$router.push('/login')
      })
    },
    // 获取当前 登录用户的头像以及昵称
    loadUser () {
      this.$axios({
        method: 'get',
        url: '/user/profile'
      }).then(res => {
        // console.log(res)
        this.user = res.data.data
      }).catch(() => {
        this.$message.error('获取头像失败')
      })
    }
  }
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
