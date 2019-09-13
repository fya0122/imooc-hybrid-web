<template>
  <div class="main">
    <keep-alive>
      <component :is="currentComponent"></component>
    </keep-alive>
    <tool-bar ref="toolBar" @onChangeFragment="onChangeFragment"></tool-bar>
  </div>
</template>
<script>
import ToolBar from '@c/currency/ToolBar.vue'
export default {
  name: 'imooc',
  components: {
    ToolBar,
    Home: () => import('@c/Home'),
    Shopping: () => import('@c/Shopping'),
    My: () => import('@c/My')
  },
  data () {
    return {
      currentComponent: 'Home'
    }
  },
  activated () {
    // 在keep-alive被激活的时候调用指定加载页面的方法
    this.pushFragment()
  },
  methods: {
    onChangeFragment (componentName) {
      if (this.currentComponent === componentName) {
        return false
      }
      this.currentComponent = componentName
    },
    pushFragment () {
      const componentIndex = this.$route.params.componentIndex
      if (!componentIndex) {
        return false
      }
      this.$refs.toolBar.pushFragment(componentIndex)
    }
  }
}
</script>
<style scoped lang="scss">
  .main {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
