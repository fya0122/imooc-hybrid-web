<template>
  <div class="search" :style="{backgroundColor: bgColor}">
    <img class="search-icon" :src="icon" alt="">
    <span :style="{color: hintColor}" class="search-hint">大前端开发，混合京东商城系统</span>
  </div>
</template>
<script>
export default {
  props: {
    icon: {
      default: require('@img/search.svg'),
      type: String
    },
    hintColor: {
      default: '#999999',
      type: String
    },
    bgColor: {
      default: '#ffffff',
      type: String
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@css/style.scss";
.search {
  background-color: #fff;
  width: 100%;
  margin: px2rem(6);
  border-radius: px2rem(22);
  display: flex;
  align-items: center;
  &-icon {
    margin-left: $marginSize;
    width: px2rem(16);
  }
  &-hint {
    margin-left: $marginSize;
    font-size: $minInfoSize;
    color: $hintColor;
  }
}
</style>
