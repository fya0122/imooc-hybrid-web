<template>
  <div class="parallax" @scroll="onScrollChange">
    <!-- 缓慢移动区 -->
    <div class="parallax-slow" :style="{top: slowTop}">
      <slot name="parallax-slow"></slot>
    </div>
    <!-- 正常移动区 -->
    <div class="parallax-content z-index-2">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Parallax',
  data () {
    return {
      // 速度差
      SPEED_DIFF: 0,
      // 滑动值
      parallaxScroll: 0
    }
  },
  methods: {
    onScrollChange ($event) {
      this.parallaxScroll = $event.target.scrollTop
      if (this.parallaxScroll > 0) {
        this.SPEED_DIFF = 2
      } else if (this.parallaxScroll === 0) {
        this.SPEED_DIFF = 0
      }
      this.$emit('onScrollChange', this.parallaxScroll)
    }
  },
  computed: {
    /* 返回slow距离顶部的距离 */
    slowTop () {
      return (this.parallaxScroll - (this.parallaxScroll - this.SPEED_DIFF)) + 'px'
    }
  }
}
</script>
<style scoped lang="scss">
  @import "@css/style.scss";

  .parallax {
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: auto;

    &-slow {
      width: 100%;
      position: relative;
    }

    &-content {
      width: 100%;
      position: relative;
    }
  }
</style>
