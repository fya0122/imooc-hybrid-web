<template>
  <div class="login-page">
    <navigation-bar :pageName="'登录'" @onLeftClick="onLeftClick"></navigation-bar>
    <!-- 内容区 -->
    <div class="login-page-content">
      <!-- 用户名 -->
      <div class="input-container">
        <input type="text" placeholder="用户名" v-model="username"/>
      </div>
      <!-- 密码 -->
      <div class="input-container">
        <input type="password" placeholder="密码" v-model="password"/>
      </div>
      <div @click="onLoginClick" class="login-page-content-login page-commit">
        登录
      </div>
      <a class="login-page-content-register" @click="onToRegisterClick">注册新用户</a>
    </div>
  </div>
</template>
<script>
import NavigationBar from '@c/currency/NavigationBar.vue'
export default {
  name: 'login',
  components: {
    NavigationBar
  },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    onLeftClick () {
      this.$router.go(-1)
    },
    // 登录按钮的点击事件
    onLoginClick () {
      // 如果用户没有输入用户名和密码的话，就直接return
      if (this.username.length === 0 || this.password.length === 0) {
        alert('用户名或密码未输入')
        return false
      }
      /**
       * 与原生交互，验证用户输入的用户名和密码
       * */
    },
    onToRegisterClick () {
      this.$router.push({
        name: 'register',
        params: {
          routerType: 'push'
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@css/style.scss";
.login-page {
  /* 为什么要脱离文档流呢？因为动画的缘故 */
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: white;
  &-content {
    width: 100%;
    height: 100%;
    &-login {
      margin-top: 40%;
    }
    &-register {
      font-size: $infoSize;
      color: $hintColor;
      margin-top: $marginSize;
      padding: $marginSize;
      float: right;
    }
  }
}
</style>
