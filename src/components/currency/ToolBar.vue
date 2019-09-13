<template>
  <div class="tool-bar">
    <!-- tab按钮 -->
    <div class="tool-bar-item" @click="onChangeFragment(item, index)" v-for="(item, index) of toolBarData" :key="item.componentName">
      <img class="tool-bar-item-img" :src="[index === selectItemIndex ? item.hIcon : item.nIcon]" />
      <p class="tool-bar-item-name" :class="{ 'tool-bar-item-name-h': index === selectItemIndex }">{{ item.name }}</p>
    </div>
  </div>
</template>
<script>
/**
 * 1、永远在最底部
 * 2、点击tabbar的时候，页面肯定是要发生切换的
 * 3、按钮的icon，分为了默认和select选中的
 * */
export default {
  data () {
    return {
      toolBarData: [
        { nIcon: require('@img/home-n.svg'), hIcon: require('@img/home-h.svg'), name: '首页', componentName: 'Home' },
        { nIcon: require('@img/shopping-n.svg'), hIcon: require('@img/shopping-h.svg'), name: '购物车', componentName: 'Shopping' },
        { nIcon: require('@img/my-n.svg'), hIcon: require('@img/my-h.svg'), name: '我的', componentName: 'My' }
      ],
      selectItemIndex: 0
    }
  },
  methods: {
    onChangeFragment (item, index) {
      this.selectItemIndex = index
      this.$emit('onChangeFragment', item.componentName)
    },
    pushFragment (index) {
      this.onChangeFragment(this.toolBarData[index], index)
    }
  }
}
</script>
<style scoped lang="scss">
@import '@css/style.scss';
.tool-bar {
  width: 100%;
  height: px2rem(46);
  display: flex;
  justify-content: space-around;
  background-color: white;
  box-shadow: 0 0 px2rem(16) rgba(0, 0, 0, 0.2);
  border-top: px2rem(1) solid $lineColor;
  &-item {
    text-align: center;
    padding: px2rem(4) px2rem(12);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &-img {
      width: px2rem(22);
      height: px2rem(22);
    }
    &-name {
      font-size: $infoSize;
      margin-top: px2rem(4);
      &-h {
        color: $mainColor;
      }
    }
  }
}
</style>
