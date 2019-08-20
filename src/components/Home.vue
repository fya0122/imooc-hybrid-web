<template>
  <div class="home" @scroll="onScrollChange">
    <navigation-bar @onLeftClick="onLeftClick" :navBarStyle="navBarStyle" :isShowBack="false">
      <template v-slot:nav-left>
        <img :src="navBarCurrentSlotStyle.leftIcon" alt="">
      </template>
      <template v-slot:nav-center>
        <search :icon="navBarCurrentSlotStyle.search.icon" :bgColor="navBarCurrentSlotStyle.search.bgColor" :hintColor="navBarCurrentSlotStyle.search.hintColor"></search>
      </template>
      <template v-slot:nav-right>
        <img :src="navBarCurrentSlotStyle.rightIcon" alt="">
      </template>
    </navigation-bar>
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
import NavigationBar from '@c/currency/NavigationBar.vue'
import Search from '@c/currency/Search'

export default {
  name: 'Home',
  components: {
    MySwiper,
    Activity,
    ModeOptions,
    Seconds,
    Goods,
    NavigationBar,
    Search
  },
  data () {
    return {
      swiperImgs: [],
      swiperHeight: '184px',
      activityDatas: [],
      secondsDatas: [],
      // 一定要写上默认的样式和滑动的样式
      navBarSlotStyle: {
        // 默认的样式，未开始滑动的时候的样式
        normal: {
          leftIcon: require('@img/more-white.svg'),
          search: {
            bgColor: '#ffffff',
            hintColor: '#999999',
            icon: require('@img/search.svg')
          },
          rightIcon: require('@img/message-white.svg')
        },
        // 高亮的样式，滑动到一定的程序的样式
        highlight: {
          leftIcon: require('@img/more.svg'),
          search: {
            bgColor: '#d7d7d7',
            hintColor: '#ffffff',
            icon: require('@img/search-white.svg')
          },
          rightIcon: require('@img/message.svg')
        }
      },
      // 当前使用的插槽样式
      navBarCurrentSlotStyle: {},
      navBarStyle: {
        position: 'fixed',
        backgroundColor: ''
      },
      // 记录页面的滚动值，既然滚动起来了，肯定是要大于-1的
      scrollToValue: -1,
      // 锚点值
      ANCHOR_SCROLL_TOP: 160
    }
  },
  created () {
    // 1、一开始让它是默认的
    this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal
    this._initSwiperData()
    this._initActivityDatas()
    this._initSecondsDatas()
  },
  methods: {
    onLeftClick () {
      alert('yes')
    },
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
    },
    onScrollChange ($event) {
      this.scrollToValue = $event.target.scrollTop
      // 计算navBar的背景颜色呢
      let opacity = this.scrollToValue / this.ANCHOR_SCROLL_TOP
      if (opacity >= 1) {
        this.navBarCurrentSlotStyle = this.navBarSlotStyle.highlight
      } else {
        this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal
      }
      this.navBarStyle.backgroundColor = `rgba(255, 255, 255, ${opacity})`
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
