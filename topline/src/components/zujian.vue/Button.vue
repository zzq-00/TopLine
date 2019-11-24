<template>
<div>
    <button @click='onChangeNum(-1)'>-</button>
    <input type="text" @input="onInput" :value="value">
    <button @click='onChangeNum(1)'>+</button>
</div>
</template>

<script>
export default {
  // props 简写方式，不建议
//   props: ['value', 'min', 'max'], // 原声input 的value值===>v-model的num
  props: {
    value: {
      type: Number,
      required: true // 必须填
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 10
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // 如果是数组
    obj: {
      type: Object,
      default () {
        return {
          // 数据
        }
      }
    },
    // 如果是数组
    arr: {
      type: Array,
      default () {
        return [
          // 数据
        ]
      }
    },
    propF: {
      valildator: function (value) {
        return ['success', 'warning', 'danger'].indexOf({})
      }
    }
  },
  methods: {
    onChangeNum (num) {
      var number = num + this.value
      this.$emit('input', number)//
    },
    onInput (e) {
      this.$emit('input', e.target.value)
    }
  },
  watch: {
    value (currentValue, oldValue) {
    //   change表示要监听的事件名
      this.$emit('change', currentValue, oldValue)
    }

  }

}

</script>

<style>

</style>
