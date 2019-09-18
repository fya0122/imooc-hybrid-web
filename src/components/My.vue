<template>
  <div class="my">
    <navigation-bar :isShowBack="false" :pageName="'个人中心'"></navigation-bar>
    <div class="my-content">
      <!-- 头像区域 -->
      <div class="my-content-header" @click="onLoginClick">
        <img class="my-content-header-avater" src="@img/avater.png" alt="">
        <p class="my-content-header-login">{{ $store.getters.username ? $store.getters.username : '登录/注册'}}</p>
      </div>
      <!-- 工具栏区域 -->
      <div class="my-content-tools">
        <div class="my-content-tools-item" :key="item" v-for="item of toolsData">
          <p class="my-content-tools-item-name">{{ item }}</p>
          <img class="my-content-tools-item-arrow" src="@img/right-arrow.svg" alt="">
        </div>
      </div>
      <!-- 只有当你登录的时候，这个退出按钮才会显示 -->
      <div @click="onLogoutClick" class="my-content-logout page-commit" v-if="$store.getters.username">退出登录</div>
    </div>
  </div>
</template>
<script>
import NavigationBar from '@c/currency/NavigationBar.vue'
export default {
  components: {
    NavigationBar
  },
  data () {
    return {
      toolsData: [
        '全部订单',
        '我的预约',
        '应用推荐',
        '用户福利'
      ]
    }
  },
  methods: {
    onLoginClick () {
      this.$router.push({
        name: 'login',
        params: {
          routerType: 'push'
        }
      })
    },
    onLogoutClick () {
      if (window.androidJSBridge) {
        this.onLogoutToAndroid()
      } else if (window.webkit) {
        this.onLogoutToIOS()
      }
    },
    onLogoutToAndroid () {
      const result = window.androidJSBridge.logout()
      this.onLogoutCallback(result)
    },
    onLogoutToIOS () {
      window.logoutCallback = this.onLogoutCallback
      window.webkit.messageHandlers.logout.postMessage({})
    },
    onLogoutCallback (result) {
      if (result) {
        this.$store.commit('user/CLEAR_USERNAME')
        alert('退出登录成功')
      } else {
        alert('操作失败, 请重试')
      }
    }
  }
}
</script>
<style scoped lang="scss">
@import "@css/style.scss";
.my {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  background-color: $bgColor;
  &-content {
    height: 100%;
    width: 100%;
    /* 头部区域 */
    &-header {
      margin-top: $marginSize;
      background-color: white;
      height: px2rem(68);
      display: flex;
      align-items: center;
      border-top: px2rem(1) solid $lineColor;
      border-bottom: px2rem(1) solid $lineColor;
      padding: $marginSize;
      &-avater {
        width: px2rem(52);
        height: px2rem(52);
      }
      &-login {
        margin-left: $marginSize;
        font-size: $titleSize;
      }
    }
    /* 工具栏 */
    &-tools {
      &-item {
        display: flex;
        height: px2rem(46);
        box-sizing: border-box;
        align-items: center;
        padding: $marginSize;
        background-color: white;
        border-bottom: px2rem(1) solid $lineColor;
        &-name {
          font-size: $infoSize;
          flex-grow: 1;
        }
        &-arrow {
          width: px2rem(16);
        }
      }
    }
    /* 退出 */
    &-logout {
      margin-top: 20%;
    }
  }
}
</style>
