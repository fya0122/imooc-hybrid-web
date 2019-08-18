<template>
  <div class="goods goods-waterfall" :style="{'height': goodsViewHeight}">
    <div :style="goodsItemStyles[index]" :key="item.id" v-for="(item, index) of dataSource" ref="goodsItem" class="goods-item goods-waterfall-item">
      <img class="goods-item-img" :src="item.img" :style="imgStyles[index]" alt="">
      <div class="goods-item-desc">
        <p class="goods-item-desc-name">
          <span class="text-line-2">{{ item.name }}</span>
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
export default {
  name: 'Goods',
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
      goodsViewHeight: 0
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
          this.initImgStyles()
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
      this.goodsViewHeight = leftHeightTotal > rightHeightTotal ? leftHeightTotal : rightHeightTotal + 'px'
    }
  }
}
</script>
<style scoped lang="scss">
  @import '@css/style.scss';

  .goods {
    background-color: $bgColor;

    &-item {
      background-color: white;
      padding: $marginSize;
      box-sizing: border-box;

      &-desc {
        width: 100%;

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

          &-volume {
            font-size: $infoSize;
            color: $hintColor;
          }
        }
      }
    }
  }

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
