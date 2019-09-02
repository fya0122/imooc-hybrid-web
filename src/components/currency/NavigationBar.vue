<template>
  <div :style="navBarStyle" class="nav-bar z-index-max" :class="{'bottom-line': pageName}">
    <div @click="$emit('onLeftClick')" class="left">
      <img v-if="isShowBack" src="@img/back.svg" alt="">
      <slot name="nav-left"></slot>
    </div>
    <div class="center">
      <span v-if="pageName" class="page-title">{{ pageName }}</span>
      <slot name="nav-center"></slot>
    </div>
    <div class="right">
      <slot name="nav-right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    pageName: {
      type: String,
      default: ''
    },
    isShowBack: {
      type: Boolean,
      default: true
    },
    navBarStyle: {
      type: Object,
      default () {
        return {
          backgroundColor: 'white'
        }
      }
    }
  }
}
</script>
<style scoped lang="scss">
  @import '@css/style.scss';

  .nav-bar {
    width: 100%;
    height: px2rem(44);
    line-height: px2rem(44);
    display: flex;
    justify-content: space-between;

    .left,
    .right {
      display: flex;
      height: 100%;
      width: px2rem(26);
      padding: 0 $marginSize;

      img {
        width: 100%;

        align-self: center;
      }
    }

    .center {
      height: 100%;
      display: flex;
      flex-grow: 1;

      .page-title {
        font-size: $titleSize;
        align-self: center;
        margin: 0 auto;
      }
    }
  }

  .bottom-line {
    border-bottom: 1px solid $lineColor;
  }
</style>
