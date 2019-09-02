<template>
  <div class="goods-detail">
    <navigation-bar :isShowBack="false" :navBarStyle="navBarStyle">
      <template v-slot:nav-left>
        <div class="goods-detail-nav-left" @click="onBackClick">
          <!-- 默认的黑色按钮 -->
          <img src="@img/back-2.svg" :style="{opacity: leftImgOpacity}">
          <!-- 完全展示之后的白色后退按钮 -->
          <img src="@img/back-white.svg" :style="{opacity: navBarSlotOpacity}">
        </div>
      </template>
      <template v-slot:nav-center>
        <p class="goods-detail-nav-title" :style="{opacity: navBarSlotOpacity}">商品详情</p>
      </template>
    </navigation-bar>
    <div class="goods-detail-content">
      <parallax @onScrollChange="onScrollChange">
        <template v-slot:parallax-slow>
          <my-swiper :paginationType="'2'" :height="SWIPER_IMAGE_HEIGHT + 'px'" :swiperImgs="goodsData.swiperImgs">
          </my-swiper>
        </template>
        <template>
          <!-- 内容 -->
          <div class="goods-detail-content-desc">
            <div class="goods-detail-content-desc-item">
              <p class="goods-detail-content-desc-item-price">￥{{ goodsData.price | priceValue }}</p>
              <p class="goods-detail-content-desc-item-name">
                <direct v-if="goodsData.isDirect"></direct>
                {{ goodsData.name }}
              </p>
            </div>
            <div class="goods-detail-content-desc-item">
              <p class="goods-detail-content-desc-item-select">
                已选
                <span class="single-row-text">{{ goodsData.name }}</span>
              </p>
              <!-- 附加服务 -->
              <div class="goods-detail-content-desc-item-support">
                <ul class="goods-detail-content-desc-item-support-list">
                  <li class="goods-detail-content-desc-item-support-list-item" v-for="item of attachDatas" :key="item">
                    <img src="@img/support.svg" alt="">
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="goods-detail-content-desc-detail">
              <img :key="item" v-for="item of goodsData.detailImgs" :src="item" alt="">
            </div>
          </div>
        </template>
      </parallax>
    </div>
    <!-- 加入购物车、立即购买 -->
    <div class="goods-detail-buy">
      <div class="goods-detail-buy-add">加入购物车</div>
      <div class="goods-detail-buy-now">立即购买</div>
    </div>
  </div>
</template>
<script>
import NavigationBar from '@c/currency/NavigationBar.vue'
import MySwiper from '@c/swiper/MySwiper.vue'
import Direct from '@c/goods/Direct.vue'
import Parallax from '@c/parallax/Parallax.vue'
export default {
  name: 'goodsDetail',
  data () {
    return {
      /* swiper的高度 */
      SWIPER_IMAGE_HEIGHT: 364,
      /* 锚点值 */
      ANCHOR_SCROLL_TOP: 310,
      goodsData: {},
      /* 附加服务 */
      attachDatas: [
        '可配送海外',
        '京东发货&售后',
        '京准达',
        '211限时达',
        '可自提',
        '不可使用优惠券'
      ],
      /* 页面滑动值 */
      scrollValue: 0
    }
  },
  components: {
    NavigationBar,
    MySwiper,
    Direct,
    Parallax
  },
  created () {
    this.goodsData = this.$route.params.goods
  },
  methods: {
    onBackClick () {
      this.$router.go(-1)
    },
    onScrollChange (e) {
      /* 获取当前页面滑动的值 */
      this.scrollValue = e
    }
  },
  computed: {
    /* 左侧的透明度，一开始是1，逐渐变成了0 */
    leftImgOpacity () {
      return (1 - this.scrollValue / this.ANCHOR_SCROLL_TOP) > 0 ? (1 - this.scrollValue / this.ANCHOR_SCROLL_TOP)
        : 0
    },
    /* navbar的样式 */
    navBarStyle () {
      return {
        backgroundColor: `rgba(216, 30, 6, ${this.navBarSlotOpacity})`,
        position: 'fixed',
        top: 0
      }
    },
    /* navbar的插槽位置，它跟左侧的透明度正好是相反的，它一开始就是0，逐渐显示的 */
    navBarSlotOpacity () {
      return 1 - this.leftImgOpacity
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "@css/style.scss";

  .goods-detail {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    &-nav-left {
      width: 100%;
      display: flex;
      position: relative;

      img {
        align-self: center;
        position: absolute;
      }
    }

    &-nav-title {
      width: 100%;
      height: 100%;
      font-size: $titleSize;
      font-weight: bold;
      text-align: center;
      color: white;
    }

    &-content {
      height: 100%;

      &-desc {
        width: 100%;
        background-color: $bgColor;
        box-shadow: 0 0 px2rem(16) 0 rgba(0, 0, 0, 0.2);

        &-item {
          background-color: white;
          padding: $marginSize;
          margin-bottom: $marginSize;

          &-price {
            font-size: px2rem(20);
            color: $mainColor;
            font-weight: 500;
          }

          &-name {
            margin-top: $marginSize;
            font-size: $titleSize;
            font-weight: 500;
            line-height: px2rem(20);
          }

          &-select {
            font-size: $infoSize;
            color: $hintColor;
            height: px2rem(44);
            display: flex;
            align-items: center;
            border-bottom: px2rem(1) solid $lineColor;

            span {
              color: $textColor;
              font-size: $titleSize;
              font-weight: bold;
              margin-left: px2rem(4);
            }
          }

          &-support {
            margin-top: $marginSize;

            &-list {
              display: flex;
              flex-wrap: wrap;

              &-item {
                display: flex;
                align-items: center;
                padding: px2rem(6) 0;
                margin-right: $marginSize;

                img {
                  width: px2rem(12);
                  margin-right: px2rem(4);
                }

                span {
                  font-size: $minInfoSize;
                  color: $hintColor;
                }
              }
            }
          }
        }

        /* 描述 */
        &-detail {
          img {
            width: 100%;
          }
        }
      }
    }

    &-buy {
      background-color: white;
      border-top: px2rem(1) solid $lineColor;
      height: px2rem(46);
      line-height: px2rem(46);
      text-align: right;

      div {
        display: inline-block;
        width: px2rem(100);
        text-align: center;
        font-size: $infoSize;
        color: white;
      }

      &-add {
        background-color: $mainColor;
      }

      &-now {
        background-color: darkgoldenrod;
      }
    }
  }
</style>
