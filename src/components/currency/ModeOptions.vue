<template>
  <div class="mode-options">
    <div @click="onItemClick(item)" class="mode-options-item" :key="item.id" v-for="item of dataSource">
      <img :src="item.icon" alt="" class="mode-options-item-icon">
      <p class="mode-options-item-title">{{ item.title }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ModeOptions',
  data () {
    return {
      // 数据源
      dataSource: [{
        id: 1,
        icon: require('@img/jingDongChaoShi.png'),
        title: '京东超市'
      }, {
        id: 2,
        icon: require('@img/jingDongChaoShi.png'),
        title: '京东超市'
      }, {
        id: 3,
        icon: require('@img/jingDongChaoShi.png'),
        title: '京东超市'
      }, {
        id: 4,
        icon: require('@img/jingDongChaoShi.png'),
        title: '京东超市'
      }, {
        id: 5,
        icon: require('@img/jingDongChaoShi.png'),
        title: '京东超市'
      }, {
        id: 6,
        icon: require('@img/jingDongChaoShi.png'),
        title: '京东超市'
      }, {
        id: 7,
        icon: require('@img/jingDongChaoShi.png'),
        title: '京东超市'
      }, {
        id: 8,
        icon: require('@img/jingDongChaoShi.png'),
        title: '京东超市'
      }, {
        id: 9,
        icon: require('@img/jingDongChaoShi.png'),
        title: '京东超市'
      }, {
        id: 10,
        icon: require('@img/jingDongChaoShi.png'),
        title: '京东超市'
      }]
    }
  },
  methods: {
    onItemClick (item) {
      window.console.log(item)
      this.$router.push({
        name: 'GoodsList'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '@css/style.scss';

  .mode-options {
    display: flex;
    flex-wrap: wrap;
    background-color: #fff;
    padding-bottom: px2rem(14);
    &-item {
      width: 20%;
      text-align: center;
      margin-top: px2rem(10);
      &-icon {
        width: px2rem(40);
        height: px2rem(40);
      }
      &-title {
        font-size: $minInfoSize;
        margin-top: px2rem(6);
      }
    }
  }
</style>
