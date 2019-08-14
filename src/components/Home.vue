<template>
  <div class="home">
    <div class="home-content">
      <my-swiper :swiperImgs="swiperImgs" :height="swiperHeight"></my-swiper>
      <activity>
        <div class="activity-520">
          <img :key="item.id" v-for="item of activityDatas" :src="item.icon" alt="">
        </div>
      </activity>
    </div>
  </div>
</template>
<script>
  import MySwiper from '@c/swiper/MySwiper.vue'
  import Activity from '@c/currency/Activity.vue'
  export default {
    name: 'Home',
    components: {
      MySwiper,
      Activity
    },
    data() {
      return {
        swiperImgs: [],
        swiperHeight: '184px',
        activityDatas: []
      };
    },
    created() {
      this._initSwiperData()
      this._initActivityDatas()
    },
    methods: {
      _initSwiperData() {
        this.$http.get('/swiper').then(res => {
          if (res.data.state === '0' && res.data.data.list.length > 0) {
            this.swiperImgs = res.data.data.list;
          } else {
            this.swiperImgs = [];
          }
        }).catch(err => {
          console.log(err);
          this.swiperImgs = [];
        })
      },
      _initActivityDatas() {
        this.$http.get('/activitys').then((res) => {
          if (res.data.state === '0' && res.data.data.list.length > 0) {
            this.activityDatas = res.data.data.list
            console.log(this.activityDatas)
          } else {
            this.activityDatas = []
          }
        }).catch((err) => {
          console.log(err)
          this.activityDatas = []
        })
      }
    }
  };
</script>
<style lang="scss" scoped>
  @import '@css/style.scss';

  .home {
    width: 100%;
    height: 100%;
    font-size: 16px;
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
    }
  }
</style>
