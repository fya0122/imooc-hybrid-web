<template>
  <div class="home">
    <div class="home-content"><my-swiper :swiperImgs="swiperImgs" :height="swiperHeight"></my-swiper></div>
  </div>
</template>
<script>
import MySwiper from './swiper/MySwiper.vue';
export default {
  name: 'Home',
  components: {
    MySwiper
  },
  data () {
    return {
      swiperImgs: [
        require('@img/swiper-1.jpg'),
        require('@img/swiper-2.jpg'),
        require('@img/swiper-3.jpg'),
        require('@img/swiper-4.jpg'),
        require('@img/swiper-5.jpg'),
        require('@img/swiper-6.jpg'),
        require('@img/swiper-7.jpg'),
        require('@img/swiper-8.jpg')
      ],
      swiperHeight: '184px'
    };
  }
};
</script>
<style lang="scss">
.home {
  width: 100%;
  height: 100%;
  font-size: 16px;
  &-content {
    height: 100%;
  }
}
</style>
