<template>
  <div class="register-page">
    <navigation-bar :pageName="'注册'" @onLeftClick="onLeftClick"></navigation-bar>
    <!-- 内容区 -->
    <div class="register-page-content">
      <!-- 用户名 -->
      <div class="input-container">
        <input type="text" placeholder="用户名" v-model="username">
      </div>
      <!-- 密码 -->
      <div class="input-container">
        <input type="password" placeholder="密码" v-model="password">
      </div>
      <!-- 确认密码 -->
      <div class="input-container">
        <input type="password" placeholder="确认密码" v-model="confirmPassword">
      </div>
      <!-- 确认框 -->
      <div @click="onRegisterClick" class="register-page-content-register page-commit">
        注册
      </div>
    </div>
  </div>
</template>
<script>
import NavigationBar from '@c/currency/NavigationBar.vue'
import md5 from '@js/md5.min.js'
export default {
  name: 'register',
  components: {
    NavigationBar
  },
  data () {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      md5Password: ''
    }
  },
  methods: {
    onLeftClick () {
      this.$router.go(-1)
    },
    onRegisterClick () {
      if (this.username.length === 0) {
        alert('请完善用户名')
        return false
      }
      if (this.password.length === 0 || this.password !== this.confirmPassword) {
        alert('请完善密码')
        return false
      }
      // md5加密后的密码
      this.md5Password = md5(this.password)
      /**
       * @判断当前的项目是运行在Android还是ios中，差别是：Android只能接收基本类型的，ios可以是对象的
       * */
      if (window.androidJSBridge) {
        // Android
        this.onRegisterToAndroid()
      } else if (window.webkit) {
        // ios
        this.onRegisterToIOS()
      }
    },
    // Android方法
    onRegisterToAndroid () {
      const userJSON = JSON.stringify({
        'username': this.username,
        'password': this.md5Password
      })
      // 调用Android注册方法
      const result = window.androidJSBridge.register(userJSON)
      this.onRegisterCallback(result)
    },
    // ios方法
    onRegisterToIOS () {
      // ios注册是接收对象类型的
      const userObj = {
        'username': this.username,
        'password': this.md5Password
      }
      /**
       * ios不能直接返回返回值
       * 所以ios操作完成之后会回调对应的回调方法
       * 同时原生调用JS的方法只能使调用绑定到window对象中的方法
       * 所以我们需要把ios操作完成之后的回调方法(registerCallback)绑定到window对象下
       * */
      window.registerCallback = this.onRegisterCallback
      window.webkit.messageHandlers.register.postMessage(userObj)
    },
    // 处理native的返回值
    onRegisterCallback (result) {
      if (result) {
        alert('注册成功')
        this.onBackClick()
      } else {
        alert('注册失败, 请重试!')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@css/style.scss";
.register-page {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  &-content {
    width: 100%;
    height: 100%;
    &-register {
      margin-top: 40%;
    }
  }
}
</style>
