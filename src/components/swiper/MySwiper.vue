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
      default(){
        return []
      }
    }
  },
  data(){
    return {
      swiperOptions: {
        autoplay: 3500,
        autoHeight: true
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>
