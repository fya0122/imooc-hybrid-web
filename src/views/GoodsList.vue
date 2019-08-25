<template>
  <div class="goods-list-page">
    <navigation-bar :pageName="'商品列表'" @onLeftClick="onLeftClick"></navigation-bar>
    <div class="goods-list-page-content">
      <goods-options></goods-options>
      <goods></goods>
    </div>
  </div>
</template>
<script>
import NavigationBar from '@c/currency/NavigationBar.vue'
import GoodsOptions from '@c/goods/GoodsOptions.vue'
import Goods from '@c/goods/Goods.vue'
export default {
  name: 'GoodsList',
  components: {
    NavigationBar,
    GoodsOptions,
    Goods
  },
  methods: {
    onLeftClick () {
      this.$router.go(-1)
    }
  }
}
</script>
<style scoped lang="scss">
@import '@css/style.scss';
.goods-list-page {
  width: 100%;
  height: 100%;
  background-color: $bgColor;
  display: flex;
  flex-direction: column;
  &-content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>
