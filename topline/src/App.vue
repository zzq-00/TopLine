<template>
<div>
  <!-- 一级路由容器 -->
  <router-view></router-view>
  <!-- <button-num
    v-model="num"
    @change = 'onNumChange'
    :min='1'
    :max='10'
    placeholder='计数器'
    :disabled="idDisablied"
  ></button-num> -->
  <!-- change表示要监听的事件名 @change是组件的自定义名对应$emit里的值 -->
</div>
</template>
<script>
// import Button from './components/zujian.vue/Button.vue'
export default {
  // components: {
  //   'button-num': Button
  // },
  // data () {
  //   return {
  //     num: 10
  //   }
  // },
  // methods: {
  //   onNumChange (currentValue, oldValue) {
  //     console.log('num改变了', currentValue, oldValue)
  //   }
  // }
}
</script>

<style lang="less">

</style>
