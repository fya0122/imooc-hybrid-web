<template>
  <div class="shopping">
    <navigation-bar :isShowBack="false" :pageName="'购物车'"></navigation-bar>
    <div class="shopping-content">
      <div class="shopping-content-list">
        <!-- 商品 -->
        <div class="shopping-content-list-item" :key="item.id" v-for="(item, index) of shoppingDatas">
          <img @click="onGoodsCheckClick(item)" :src="checkImg(item.isCheck)" class="shopping-content-list-item-check">
          <img class="shopping-content-list-item-img" :src="item.img" alt="">
          <div class="shopping-content-list-item-desc">
            <p class="shopping-content-list-item-desc-name text-line-2">
              <direct v-if="item.isDirect"></direct>
              {{ item.name }}
            </p>
            <div class="shopping-content-list-item-desc-data">
              <p class="shopping-content-list-item-desc-data-price">￥{{ item.price | priceValue }}</p>
              <number-manager :defaultNumber="item.number" @onChangeNumber="onChangeNumber(arguments, item, index)"></number-manager>
            </div>
          </div>
        </div>
      </div>
      <!-- 统计 -->
      <div class="shopping-content-total">
        <!-- check -->
        <div class="shopping-content-total-check">
          <img :src="checkImg(totalData.isAll)" @click="onAllCheckClick">
        </div>
        <!-- total -->
        <div class="shopping-content-total-price">
          <p class="shopping-content-total-price-total">合计：<span>￥{{ totalData.totalPrice | priceValue }}</span></p>
          <p class="shopping-content-total-price-all">
            总额：<span>￥{{ totalData.totalPrice | priceValue }}</span>
            &nbsp;&nbsp;
            立减<span>￥0.00</span>
          </p>
        </div>
        <!-- 结算 -->
        <div class="shopping-content-total-commit">
          去结算({{ totalData.goodsNumber }})
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NavigationBar from '@c/currency/NavigationBar.vue'
import Direct from '@c/goods/Direct.vue'
import NumberManager from '@c/goods/NumberManager.vue'
export default {
  components: {
    NavigationBar,
    Direct,
    NumberManager
  },
  data () {
    return {
      shoppingDatas: [],
      totalData: {
        isAll: false, /* 是否全选 */
        totalPrice: 0, /* 总价格 */
        goodsNumber: 0 /* 总数量 */
      }
    }
  },
  activated () {
    this.shoppingDatas = this.$store.getters.shoppingDatas
    /* 页面重新打开的时候也是要计算的 */
    this.computedGoodsTotal()
  },
  methods: {
    onChangeNumber ($arguments, item, index) {
      let number = $arguments[0]
      this.$store.commit('goods/CHANGESHOPPINGDATANUMBER', {
        index: index,
        number: number
      })
      if (item.isCheck) {
        this.computedGoodsTotal()
      }
    },
    /* 单选 */
    onGoodsCheckClick (item) {
      item.isCheck = !item.isCheck /* 取反 */
      this.computedGoodsTotal()
    },
    /* 全选点击事件 */
    onAllCheckClick () {
      this.totalData.isAll = !this.totalData.isAll
      this.shoppingDatas.forEach(item => {
        item.isCheck = this.totalData.isAll
      })
      this.computedGoodsTotal()
    },
    /* 选中的图片 */
    checkImg (isCheck) {
      return isCheck ? require('@img/check.svg') : require('@img/no-check.svg')
    },
    /* 计算总计的数据 */
    computedGoodsTotal () {
      this.totalData = {
        isAll: true, // 我们初始化的时候，默认为true，当有商品未被选中的时候，设置为false即可
        totalPrice: 0,
        goodsNumber: 0
      }
      this.shoppingDatas.forEach((item) => {
        if (item.isCheck) {
          this.totalData.totalPrice += parseFloat(item.price) * parseInt(item.number)
          this.totalData.goodsNumber += parseInt(item.number)
        } else {
          this.totalData.isAll = false
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
@import '@css/style.scss';
.shopping {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-flow: column;
  &-content {
    background-color: $bgColor;
    border-top: px2rem(1) solid $lineColor;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    /* 商品列表 */
    &-list {
      height: 100%;
      overflow: hidden;
      overflow-y: auto;
      &-item {
        background-color: white;
        padding: $marginSize;
        display: flex;
        border-bottom: px2rem(1) solid $lineColor;
        &-check {
          width: $checkSize;
          align-self: center;
          padding: px2rem(6);
        }
        &-img {
          width: $listGoodsImgSize;
          height: $listGoodsImgSize;
        }
        &-desc {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 0 $marginSize;
          &-name {
            font-size: $infoSize;
            line-height: px2rem(18);
          }
          &-data {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: $marginSize;
            &-price {
              font-size: $titleSize;
              color: $mainColor;
              font-weight: 500;
            }
          }
        }
      }
    }
    /* 总计 */
    &-total {
      height: px2rem(56);
      box-sizing: border-box;
      display: flex;
      align-items: center;
      background-color: white;
      border-top: px2rem(1) solid $lineColor;
      &-check {
        display: flex;
        align-items: center;
        margin: 0 $marginSize;
        img {
          width: $checkSize;
          height: $checkSize;
          padding: px2rem(6);
        }
        p {
          font-size: $infoSize;
        }
      }
      &-price {
        flex-grow: 2;
        display: flex;
        flex-direction: column;
        &-total {
          font-size: $titleSize;
          margin-bottom: px2rem(6);
          span {
            font-weight: bold;
          }
        }
        &-all {
          font-size: $minInfoSize;
          span {
            font-weight: bold;
          }
        }
      }
      &-commit {
        width: px2rem(120);
        height: 100%;
        font-size: $titleSize;
        background-color: $mainColor;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
