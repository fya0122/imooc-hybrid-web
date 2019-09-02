<template>
  <!-- 需要一个swiper的容器 -->
  <swiper :options="swiperOptions">
    <swiper-slide v-for="item of swiperImgs" :key="item.id"><img :style="{ height: height }" class="swiper-slide-img" :src="item" alt=""/></swiper-slide>
    <template v-slot:pagination>
      <div class="swiper-pagination"></div>
    </template>
  </swiper>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
  props: {
    height: {
      type: String,
      default: 'auto'
    },
    swiperImgs: {
      type: Array,
      required: true,
      default: function () {
        return []
      }
    },
    /* 分页器的，1为圆点切换，2为数字 */
    paginationType: {
      type: String,
      default: '1'
    }
  },
  data () {
    return {
      swiperOptions: {
        autoplay: true,
        autoHeight: true,
        pagination: {
          // 分页器的对应的html
          el: '.swiper-pagination',
          // 样式
          type: 'bullets',
          bulletClass: 'custom-bullet-class'
        }
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  created () {
    this.initPaginationLayout()
  },
  methods: {
    initPaginationLayout () {
      if (this.paginationType === '1') {
        this.swiperOptions.pagination = {
          // 分页器的对应的html
          el: '.swiper-pagination',
          // 样式
          type: 'bullets',
          bulletClass: 'custom-bullet-class'
        }
      } else if (this.paginationType === '2') {
        this.swiperOptions.pagination = {
          // 分页器的对应的html
          el: '.swiper-pagination',
          // 样式，分页器，数字分页器的
          type: 'fraction'
        }
      }
    }
  }
}
</script>
<style lang="scss">
  @import '@css/style.scss';
  .swiper-slide-img {
    width: 100%;
  }
  /* 圆点分页器 */
  .swiper-pagination {
    bottom: px2rem(12);

    .custom-bullet-class {
      box-sizing: border-box;
      border-radius: 100%;
      height: px2rem(6);
      width: px2rem(6);
      border: px2rem(1) solid #fff;
      margin: 0 px2rem(4);
      display: inline-block;
      opacity: 1;
    }

    .swiper-pagination-bullet-active {
      background: #fff;
    }
  }
  /* 数字分页器 */
  .swiper-pagination-fraction {
    left: auto;
    right: 0;
    width: auto;
    font-size: $infoSize;
    background-color: rgba(0, 0, 0, 0.3);
    padding: px2rem(6) px2rem(18);
    border-top-left-radius: px2rem(16);
    border-bottom-left-radius: px2rem(16);
    bottom: px2rem(32);
    color: white;
    .swiper-pagination-current {
      font-size: $titleSize;
      font-weight: bold;
    }
  }
</style>
