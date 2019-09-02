<template>
  <div class="goods-list-page">
    <navigation-bar :pageName="'商品列表'" @onLeftClick="onLeftClick">
      <template v-slot:nav-right>
        <img :src="layoutType.icon" @click="onChangeLayoutTypeClick()">
      </template>
    </navigation-bar>
    <div class="goods-list-page-content">
      <goods-options @optionsChange="onGoodsOptionsChange"></goods-options>
      <goods :sort="sortType" :layoutType="layoutType.type"></goods>
    </div>
  </div>
</template>
<script>
import NavigationBar from '@c/currency/NavigationBar.vue'
import GoodsOptions from '@c/goods/GoodsOptions.vue'
import Goods from '@c/goods/Goods.vue'
export default {
  name: 'goodsList',
  data () {
    return {
      layoutTypeDatas: [
        {
          type: '1',
          icon: require('@img/list-type.svg')
        },
        {
          type: '2',
          icon: require('@img/grid-type.svg')
        },
        {
          type: '3',
          icon: require('@img/waterfall-type.svg')
        }
      ],
      layoutType: {},
      sortType: '1-1'
    }
  },
  components: {
    NavigationBar,
    GoodsOptions,
    Goods
  },
  created () {
    this.layoutType = this.layoutTypeDatas[0]
  },
  methods: {
    onGoodsOptionsChange (id) {
      this.sortType = id
    },
    onLeftClick () {
      this.$router.go(-1)
    },
    onChangeLayoutTypeClick () {
      if (this.layoutType.type === '1') {
        this.layoutType = this.layoutTypeDatas[1]
      } else if (this.layoutType.type === '2') {
        this.layoutType = this.layoutTypeDatas[2]
      } else if (this.layoutType.type === '3') {
        this.layoutType = this.layoutTypeDatas[0]
      }
    }
  }
}
</script>
<style scoped lang="scss">
@import '@css/style.scss';
.goods-list-page {
  position: absolute;
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
