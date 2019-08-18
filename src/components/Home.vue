<template>
  <div class="home">
    <div class="home-content">
      <!-- 轮播图 -->
      <my-swiper :swiperImgs="swiperImgs" :height="swiperHeight"></my-swiper>
      <!-- 520活动 -->
      <activity>
        <div class="activity-520">
          <img :key="item.id" v-for="item of activityDatas" :src="item.icon" alt="">
        </div>
      </activity>
      <!-- 功能模块 -->
      <mode-options></mode-options>
      <!-- 秒杀活动模块 -->
      <seconds :dataSource="secondsDatas"></seconds>
      <!-- 拼购节 -->
      <activity>
        <div class="activity-pin-gou-jie">
          <img src="@img/pinGouJie.gif" alt="">
        </div>
      </activity>
      <goods></goods>
    </div>
  </div>
</template>
<script>
import MySwiper from '@c/swiper/MySwiper.vue'
import Activity from '@c/currency/Activity.vue'
import ModeOptions from '@c/currency/ModeOptions.vue'
import Seconds from '@c/seconds/Seconds.vue'
import Goods from '@c/goods/Goods.vue'
export default {
  name: 'Home',
  components: {
    MySwiper,
    Activity,
    ModeOptions,
    Seconds,
    Goods
  },
  data () {
    return {
      swiperImgs: [],
      swiperHeight: '184px',
      activityDatas: [],
      secondsDatas: []
    }
  },
  created () {
    this._initSwiperData()
    this._initActivityDatas()
    this._initSecondsDatas()
  },
  methods: {
    _initSwiperData () {
      this.$http.get('/swiper').then(res => {
        if (res.data.state === '0' && res.data.data.list.length > 0) {
          this.swiperImgs = res.data.data.list
        } else {
          this.swiperImgs = []
        }
      }).catch(err => {
        console.log(err)
        this.swiperImgs = []
      })
    },
    _initActivityDatas () {
      this.$http.get('/activitys').then((res) => {
        if (res.data.state === '0' && res.data.data.list.length > 0) {
          this.activityDatas = res.data.data.list
        } else {
          this.activityDatas = []
        }
      }).catch((err) => {
        console.log(err)
        this.activityDatas = []
      })
    },
    _initSecondsDatas () {
      this.$http.get('/seconds').then((res) => {
        if (res.data.state === '0' && res.data.data.list.length > 0) {
          this.secondsDatas = res.data.data.list
        } else {
          this.secondsDatas = []
        }
      }).catch((err) => {
        console.log(err)
        this.secondsDatas = []
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '@css/style.scss';

  .home {
    width: 100%;
    height: 100%;
    font-size: 16px;
    overflow: hidden;
    overflow-y: auto;
    background-color: $bgColor;
    &-content {
      height: 100%;
      .activity-520 {
        margin-top: px2rem(-8);
        border-top-left-radius: px2rem(8);
        border-top-right-radius: px2rem(8);
        img {
          display: inline-block;
          width: 33.33%;
        }
      }
      .activity-pin-gou-jie {
        background: white;
        margin-top: $marginSize;
        img {
          width: 100%;
        }
      }
    }
  }
</style>
