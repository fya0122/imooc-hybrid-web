<template>
  <div class="goods-detail">
    <navigation-bar :isShowBack="false" :navBarStyle="navBarStyle">
      <template v-slot:nav-left>
        <div class="goods-detail-nav-left" @click="onBackClick">
          <img src="@img/back-2.svg" alt="">
        </div>
      </template>
    </navigation-bar>
    <div class="goods-detail-content">
      <my-swiper :height="SWIPER_IMAGE_HEIGHT + 'px'" :swiperImgs="goodsData.swiperImgs"></my-swiper>
    </div>
  </div>
</template>
<script>
import NavigationBar from '@c/currency/NavigationBar.vue'
import MySwiper from '@c/swiper/MySwiper.vue'
export default {
  name: 'GoodsDetail',
  data () {
    return {
      SWIPER_IMAGE_HEIGHT: 364,
      navBarStyle: {
        backgroundColor: ''
      },
      goodsData: {}
    }
  },
  components: {
    NavigationBar,
    MySwiper
  },
  created () {
    this.goodsData = this.$route.params.goods
    console.log(this.goodsData)
  },
  methods: {
    onBackClick () {
      this.$router.go(-1)
    }
  }
}
</script>
