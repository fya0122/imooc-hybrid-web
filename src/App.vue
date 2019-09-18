<template>
  <div id="app">
    <transition :name="transitionName">
      <keep-alive :include="virtualTaskStack">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script type='text/javascript'>
export default {
  data () {
    return {
      transitionName: 'fold-left',
      // 虚拟的任务栈
      virtualTaskStack: ['imooc']
    }
  },
  created () {
    // 查看是否是iPhoneX
    this.$store.commit('device/SET_ISIPHONEX', window.isIphoneX)
    // App端的自动登录
    window.nativeFunctionUserLogin = this.nativeFunctionUserLogin
  },
  methods: {
    nativeFunctionUserLogin (username) {
      this.$store.commit('user/SET_USERNAME', username)
    }
  },
  watch: {
    '$route' (to, form) {
      const routerType = to.params.routerType
      if (routerType === 'push') {
        this.virtualTaskStack.push(to.name)
        this.transitionName = 'fold-left'
      } else {
        this.virtualTaskStack.pop()
        this.transitionName = 'fold-right'
      }
      if (to.params.clearTask) { // 如果为true的话，就等于我们初始化的虚拟栈
        this.virtualTaskStack = ['imooc']
      }
    }
  }
}
</script>
<style lang="scss">
  @import '@css/style.scss';

  #app {
    width: 100%;
    height: 100%;

    .fold-left-enter-active {
      animation-name: fold-left-in;
      animation-duration: 0.4s;
    }

    /* push进来的时候 */
    @keyframes fold-left-in {
      0% {
        transform: translate(100%, 0);
      }

      100% {
        transform: translate(0, 0);
      }
    }

    .fold-left-leave-active {
      animation-name: fold-left-out;
      animation-duration: 0.4s;
    }

    @keyframes fold-left-out {
      0% {
        transform: translate(0, 0);
      }

      100% {
        transform: translate(-100%, 0);
      }
    }

    .fold-right-enter-active {
      animation-name: fold-right-in;
      animation-duration: 0.4s;
    }

    /* 即将展示的，后退的 */
    @keyframes fold-right-in {
      0% {
        transform: translate(-100%, 0);
      }

      100% {
        transform: translate(0, 0);
      }
    }

    .fold-right-leave-active {
      animation-name: fold-right-out;
      animation-duration: 0.4s;
    }

    @keyframes fold-right-out {
      0% {
        transform: translate(0, 0);
      }

      100% {
        transform: translate(100%, 0);
      }
    }
  }
</style>
