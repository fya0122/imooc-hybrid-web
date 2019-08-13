<template>
  <!-- 需要一个swiper的容器 -->
  <swiper :options="swiperOptions">
    <swiper-slide v-for="(item, index) in swiperImgs" :key="index"><img :style="{ height: height }" class="swiper-slide-img" :src="item" alt="" /></swiper-slide>
    <template v-slot:pagination>
      <div class="swiper-pagination"></div>
    </template>
  </swiper>
</template>
<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
export default {
  name: 'MySwiper',
  props: {
    height: {
      type: String,
      default: 'auto'
    },
    swiperImgs: {
      type: Array,
      required: true,
      default: function() {
        return [];
      }
    }
  },
  data() {
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
    };
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>
<style lang="scss">
@import '@css/style.scss';
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
</style>
