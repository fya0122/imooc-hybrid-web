<template>
  <div class="buy-page">
    <navigation-bar :pageName="'立即购买'" @onLeftClick="onBackCLick"></navigation-bar>
    <!-- 内容区 -->
    <div class="buy-page-content">
      <div class="buy-page-content-goods">
        <img class="buy-page-content-goods-img" :src="goodsData.img" alt="">
        <div class="buy-page-content-goods-desc">
          <p class="buy-page-content-goods-desc-name">{{ goodsData.name }}</p>
          <p class="buy-page-content-goods-desc-price">{{ goodsData.price | priceValue }}</p>
        </div>
      </div>
      <ul class="buy-page-content-list">
        <li @click="onPaymentItemClick(item)" class="buy-page-content-list-item" :key="item.id" v-for="item of paymentDatas">
          <img class="buy-page-content-list-item-icon" :src="item.icon" alt="">
          <div class="buy-page-content-list-item-desc">
            <p class="buy-page-content-list-item-desc-name">{{ item.name }}</p>
            <p class="buy-page-content-list-item-desc-desc">{{ item.desc }}</p>
          </div>
          <!-- 选中支付方式的标记 -->
          <img class="buy-page-content-list-item-check" :src="getCheckIcon(item.id === selectPayment.id)" alt="">
        </li>
      </ul>
    </div>
    <div class="pay page-commit">
      立即购买
    </div>
  </div>
</template>
<script>
import NavigationBar from '@c/currency/NavigationBar.vue'
export default {
  name: 'buy',
  data () {
    return {
      goodsData: {},
      paymentDatas: [{
        id: '1',
        name: '支付宝支付',
        desc: '数亿用户都在用，安全可信托',
        icon: require('@img/alipay.svg')
      },
      {
        id: '2',
        name: '微信支付',
        desc: '亿万用户选择，更快更安全',
        icon: require('@img/weichat.png')
      }
      ],
      selectPayment: {}
    }
  },
  created () {
    this.selectPayment = this.paymentDatas[0]
    this.loadGoodsData()
  },
  methods: {
    async loadGoodsData () {
      const res = await this.$http.get('/goodsDetail', {
        params: {
          goodsId: this.$route.query.goodsId
        }
      })
      if (res.data.state === '0') {
        this.goodsData = res.data.data.goodsData
      } else {
        this.goodsData = {}
      }
    },
    onBackCLick () {
      this.$router.go(-1)
    },
    onPaymentItemClick (obj) {
      this.selectPayment = obj
    },
    getCheckIcon (isCheck) {
      return isCheck ? require('@img/check.svg') : require('@img/no-check.svg')
    }
  },
  components: {
    NavigationBar
  }
}
</script>
<style scoped lang="scss">
@import "@css/style.scss";
.buy-page {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: $bgColor;
  &-content {
    overflow: hidden;
    height: 100%;
    // 商品
    &-goods {
      background-color: white;
      padding: $marginSize;
      display: flex;
      border-bottom: px2rem(1) solid $lineColor;
      border-top: px2rem(1) solid $lineColor;
      margin-top: $marginSize;
      &-img {
        width: px2rem(100);
        height: px2rem(100);
      }
      &-desc {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0;
        &-name {
          font-size: $infoSize;
          line-height: px2rem(18);
        }
        &-price {
          font-size: $titleSize;
          color: $mainColor;
          font-weight: 500;
        }
      }
    }
    // 支付方式
    &-list {
      margin-top: $marginSize;
      &-item {
        display: flex;
        background-color: white;
        border-bottom: px2rem(1) solid $lineColor;
        padding: $marginSize;
        align-items: center;
        &-icon {
          height: px2rem(30);
        }
        &-desc {
          margin-left: px2rem(12);
          flex-grow: 1;
          &-name {
            font-size: $infoSize;
          }
          &-desc {
            font-size: $minInfoSize;
            margin-top: px2rem(6);
            color: $hintColor;
          }
          &-check {
            width: px2rem(16);
            height: px2rem(16);
          }
        }
      }
    }
  }
  .pay {
    position: absolute;
    bottom: px2rem(52);
  }
}
</style>
