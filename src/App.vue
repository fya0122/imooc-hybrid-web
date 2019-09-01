<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view />
    </transition>
  </div>
</template>
<script>
export default {
  data () {
    return {
      transitionName: 'fold-left'
    }
  },
  watch: {
    '$route' (to, form) {
      const routerType = to.params.routerType
      if (routerType === 'push') {
        this.transitionName = 'fold-left'
      } else {
        this.transitionName = 'fold-right'
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
