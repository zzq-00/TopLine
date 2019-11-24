<template>
  <div class="channel-select">
    <!-- v-model='value'
        :value='value'
        @input='vaule= 事件参数‘

        前者是组件属性
        后者是props数据

    -->
    <el-select placeholder="请选择活动区域" :value='value' @input="$emit('input',$event)">
        <el-option label="所有频道" :value="null"></el-option>
        <el-option
            v-for="item in channels"
            :key='item.id'
            :label='item.name'
            :value="item.id"
        ></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'ChannelSelect',
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      channels: []
    }
  },
  created () {
    this.loadChannel()
  },
  methods: {
    // 获取频道列表
    loadChannel () {
      this.$axios({
        method: 'Get',
        url: '/channels'
      }).then(res => {
        // console.log(res)
        this.channels = res.data.data.channels
      }).catch(err => {
        console.log(err, '获取数据失败')
      })
    }
  }
}
</script>

<style>

</style>
