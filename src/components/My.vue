<template>
  <div class="my">
    <navigation-bar :isShowBack="false" :pageName="'个人中心'"></navigation-bar>
  </div>
</template>
<script>
import NavigationBar from '@c/currency/NavigationBar.vue'
export default {
  name: 'My',
  components: {
    NavigationBar
  }
}
</script>
<style scoped lang="scss">
  .my {
    width: 100%;
    height: 100%;
  }
</style>
