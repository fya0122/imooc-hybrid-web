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
import md5 from '@js/md5.min.js'
export default {
  name: 'login',
  components: {
    NavigationBar
  },
  data () {
    return {
      username: '',
      password: '',
      md5Password: ''
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
      this.md5Password = md5(this.password)
      if (window.androidJSBridge) {
        this.onLoginToAndroid()
      } else if (window.webkit) {
        this.onLoginToIOS()
      }
    },
    onLoginToAndroid () {
      let userJSON = JSON.stringify({
        'username': this.username,
        'password': this.md5Password
      })
      let result = window.androidJSBridge.login(userJSON)
      this.onLoginCallback(result)
    },
    onLoginToIOS () {
      let userObj = {
        'username': this.username,
        'password': this.md5Password
      }
      window.loginCallback = this.onLoginCallback
      window.webkit.messageHandlers.login.postMessage(userObj)
    },
    onLoginCallback (result) {
      switch (result) {
        case '-1':
          alert('系统内部错误')
          break
        case '0':
          // 保存主动登录的用户名到 username
          this.$store.commit('user/SET_USERNAME', this.username)
          this.onBackClick()
          break
        case '1':
          alert('登录用户不存在')
          break
        case '2':
          alert('用户密码错误')
          break
      }
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
