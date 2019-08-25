<template>
  <div class="goods" :class="layoutClass" :style="{'height': goodsViewHeight}">
    <div :class="layoutItemClass" :style="goodsItemStyles[index]" :key="item.id" v-for="(item, index) of dataSource" ref="goodsItem" class="goods-item">
      <img class="goods-item-img" :src="item.img" :style="imgStyles[index]" alt="">
      <div class="goods-item-desc">
        <p class="goods-item-desc-name text-line-2" :class="{'goods-item-desc-name-light': !item.isHave}">
          <direct v-if="item.isDirect"></direct>
          <noHave v-if="!item.isHave"></noHave>
          {{ item.name }}
        </p>
        <div class="goods-item-desc-data">
          <p class="goods-item-desc-data-price">￥{{ item.price | priceValue }}</p>
          <p class="goods-item-desc-data-volume">销量:{{ item.volume }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Direct from '@c/goods/Direct.vue'
import NoHave from '@c/goods/NoHave.vue'
export default {
  name: 'Goods',
  props: {
    // 这个是啥意思呢？给他个默认的，比如默认就是瀑布流的
    // 当我们传入网格的时候，会改变上面的css的类名
    // 1表示为垂直列表
    // 2网格布局
    // 3瀑布流布局
    layoutType: {
      type: String,
      default: '1'
    }
  },
  components: {
    Direct,
    NoHave
  },
  data () {
    return {
      dataSource: [],
      // 最大高度
      MAX_IMG_HEIGHT: 230,
      // 最小高度
      MIN_IMG_HEIGHT: 178,
      // 图片样式
      imgStyles: [],
      // 每个item的margin
      ITEM_MARGIN_SIZE: 8,
      // item样式集合
      goodsItemStyles: [],
      // goods组件高度
      goodsViewHeight: '100%',
      // 默认下的类名
      // 1、垂直列表的展示形式goods-list和goods-list-item
      // 2、网格布局的展示形式，goods-grid和goods-grid-item
      layoutClass: 'goods-grid',
      layoutItemClass: 'goods-grid-item'
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.$http.get('/goods').then((res) => {
        if (res.data.state === '0' && res.data.data.list.length > 0) {
          this.dataSource = res.data.data.list
          // this.initImgStyles()
        } else {
          this.dataSource = []
        }
      }).catch(() => {
        this.dataSource = []
      })
    },
    // 返回随机的高度
    imgHeight () {
      let result = Math.floor(Math.random() * (this.MAX_IMG_HEIGHT - this.MIN_IMG_HEIGHT) + this.MIN_IMG_HEIGHT)
      return result
    },
    // 根据随机的图片高度，生成对应的图片数据
    initImgStyles () {
      this.dataSource.forEach((item) => {
        let imgH = this.imgHeight() + 'px'
        this.imgStyles.push({
          height: imgH
        })
      })
      this.$nextTick(() => {
        this.initWaterfall()
      })
    },
    // 瀑布流布局
    initWaterfall () {
      let $goodsItem = this.$refs.goodsItem
      console.log($goodsItem)
      if (!$goodsItem) {
        return
      }
      let leftHeightTotal = 0
      let rightHeightTotal = 0
      $goodsItem.forEach((item) => {
        let goodsItemStyle = {}

        let elHeight = item.clientHeight + this.ITEM_MARGIN_SIZE
        if (leftHeightTotal <= rightHeightTotal) {
          goodsItemStyle = {
            left: '0px',
            top: leftHeightTotal + 'px'
          }
          leftHeightTotal += elHeight
        } else {
          goodsItemStyle = {
            right: '0px',
            top: rightHeightTotal + 'px'
          }
          rightHeightTotal += elHeight
        }
        this.goodsItemStyles.push(goodsItemStyle)
      })
      let goodsViewHeight = leftHeightTotal > rightHeightTotal ? leftHeightTotal : rightHeightTotal
      this.goodsViewHeight = goodsViewHeight + 'px'
    }
  }
}
</script>
<style scoped lang="scss">
  @import '@css/style.scss';

  .goods {
    background-color: $bgColor;
    overflow: hidden;
    overflow-y: auto;
    &-item {
      background-color: white;
      padding: $marginSize;
      box-sizing: border-box;

      &-desc {
        width: 100%;

        &-name {
          font-size: $infoSize;
          line-height: px2rem(18);

          &-light {
            color: $hintColor;
          }
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

          &-volume {
            font-size: $infoSize;
            color: $hintColor;
          }
        }
      }
    }
  }

  // 垂直列表
  .goods-list {
    &-item {
      display: flex;
      border-bottom: 1px solid $lineColor;
      .goods-item-img {
        width: px2rem(120);
        height: px2rem(120);
      }
      .goods-item-desc {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: $marginSize;
      }
    }
  }

  // 网格布局
  .goods-grid {
    padding: $marginSize;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    &-item {
      width: 49%;
      border-radius: $radiusSize;
      margin-bottom: $marginSize;
      .goods-item-img {
        width: 100%;
      }
    }
  }
  // 瀑布流布局
  .goods-waterfall {
    position: relative;
    margin: $marginSize;

    &-item {
      position: absolute;
      width: 49%;
      border-radius: $radiusSize;

      .goods-item-img {
        width: 100%;
      }
    }
  }
</style>
