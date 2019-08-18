<template>
  <div class="shopping">
    <navigation-bar :isShowBack="false" :pageName="'购物车'"></navigation-bar>
  </div>
</template>
<script>
import NavigationBar from '@c/currency/NavigationBar.vue'
export default {
  name: 'Shopping',
  components: {
    NavigationBar
  }
}
</script>
<style scoped lang="scss">
  .shopping {
    width: 100%;
    height: 100%;
  }
</style>
