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
      swiperImgs: [],
      swiperHeight: '184px'
    };
  },
  created() {
    this._initSwiperData()
  },
  methods: {
    _initSwiperData() {
      this.$http.get('/swiper').then((res) => {
        if (res.data.state === '0' && res.data.data.list.length > 0) {
          this.swiperImgs = res.data.data.list
        } else {
          this.swiperImgs = []
        }
      }).catch((err) => {
        console.log(err)
        this.swiperImgs = []
      })
    }
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
