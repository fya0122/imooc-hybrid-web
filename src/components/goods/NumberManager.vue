<template>
  <div class="number-manger">
    <span @click="onLessClick" :class="{'number-manager-disabled' : number === 1}" class="number-manger-less">-</span>
    <span class="number-manger-number">{{ number }}</span>
    <span @click="onAddClick" class="number-manger-add">+</span>
  </div>
</template>
<script>
export default {
  watch: {
    defaultNumber (newVal, oldVal) {
      this.number = newVal
    },
    number (newVal, oldVal) {
      this.$emit('onChangeNumber', newVal)
    }
  },
  data () {
    return {
      number: 1
    }
  },
  props: {
    /* 父组件指定的默认的数量 */
    defaultNumber: {
      type: Number,
      default: 1
    }
  },
  methods: {
    onLessClick () {
      if (this.number === 1) {
        return false
      }
      this.number -= 1
    },
    onAddClick () {
      this.number += 1
    }
  }
}
</script>
<style scoped lang="scss">
@import "@css/style.scss";
.number-manger {
  display: flex;
  font-size: $infoSize;
  height: px2rem(20);
  line-height: px2rem(20);
  span {
    width: px2rem(30);
    text-align: center;
    display: inline-block;
    font-weight: 500;
  }
  &-number {
    background-color: $bgColor;
    padding: 0 px2rem(4);
  }
  &-disabled {
    color: $hintColor;
  }
}
</style>
